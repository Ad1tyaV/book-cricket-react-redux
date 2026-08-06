import squadCatalog from "../../data/cric-vfinal.json";
import { getDefaultXI } from "../../helpers/teamHelpers";
import manageScores from "../reducers/manageScores";
import { playOvers } from "./scoreX";

test("unused balls from an over do not carry into the second innings", () => {
  const indiaXI = getDefaultXI(squadCatalog, "India", "ODI_50");
  const englandXI = getDefaultXI(squadCatalog, "England", "ODI_50");
  let state = manageScores(undefined, {
    type: "PICK_TEAMS",
    payload: {
      team1: "India",
      team2: "England",
      overs: 50,
      format: "ODI_50",
      team1PlayingXI: indiaXI,
      team2PlayingXI: englandXI,
    },
  });
  state = {
    ...state,
    team1Wickets: 9,
    team1BallsFaced: 211,
    team1Dismissed: Array.from({ length: 9 }, (_, index) => index),
    onStrike: { batterIndex: 10 },
    offStrike: { batterIndex: 9 },
  };
  const random = jest.spyOn(Math, "random").mockReturnValue(0);
  const dispatch = (action) => {
    state = manageScores(state, action);
  };
  const getState = () => ({ manageScores: state });

  playOvers(1, "Normal")(dispatch, getState);

  expect(state.team1BallsFaced).toBe(212);
  expect(state.currentTeamBatting).toBe("England");
  expect(state.team2BallsFaced).toBe(0);
  expect(state.onStrike.batterIndex).toBe(0);
  expect(state.offStrike.batterIndex).toBe(1);
  random.mockRestore();
});
