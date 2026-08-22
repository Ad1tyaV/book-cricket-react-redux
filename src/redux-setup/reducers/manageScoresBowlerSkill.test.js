import RandomWithIndex from "../../helpers/improvedRandomNumber";
import squadCatalog from "../../data/cric-vfinal.json";
import { getDefaultXI } from "../../helpers/teamHelpers";
import manageScores from "./manageScores";

jest.mock("../../helpers/improvedRandomNumber", () => jest.fn(() => 0));

test("each delivery uses the selected bowler's individual bowling skill", () => {
  const indiaXI = getDefaultXI(squadCatalog, "India", "T20");
  const australiaXI = getDefaultXI(squadCatalog, "Australia", "T20");
  let state = manageScores(undefined, {
    type: "PICK_TEAMS",
    payload: {
      team1: "India",
      team2: "Australia",
      overs: 20,
      format: "T20",
      team1PlayingXI: indiaXI,
      team2PlayingXI: australiaXI,
    },
  });
  const firstBowlerIndex = state.currentBowler.playerIndex;
  const firstBowlerRating = australiaXI[firstBowlerIndex].bowling;

  state = manageScores(state, {
    type: "SCORE",
    payload: { pitchType: "Normal" },
  });

  expect(RandomWithIndex).toHaveBeenLastCalledWith(
    0,
    "Normal",
    "T20",
    expect.objectContaining({ bowlingRating: firstBowlerRating })
  );
  expect(firstBowlerRating).not.toBe(state.team2BowlingStrength);

  for (let ball = 1; ball < 6; ball++) {
    state = manageScores(state, {
      type: "SCORE",
      payload: { pitchType: "Normal" },
    });
  }

  const secondBowlerIndex = state.currentBowler.playerIndex;
  expect(secondBowlerIndex).not.toBe(firstBowlerIndex);

  state = manageScores(state, {
    type: "SCORE",
    payload: { pitchType: "Normal" },
  });

  expect(RandomWithIndex).toHaveBeenLastCalledWith(
    expect.any(Number),
    "Normal",
    "T20",
    expect.objectContaining({
      bowlingRating: australiaXI[secondBowlerIndex].bowling,
    })
  );
});
