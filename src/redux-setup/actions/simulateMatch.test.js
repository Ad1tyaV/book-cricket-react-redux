import squadCatalog from "../../data/cric-vfinal.json";
import { getDefaultXI } from "../../helpers/teamHelpers";
import manageScores from "../reducers/manageScores";
import simulateMatch from "./simulateMatch";

test("full match simulation batches Redux updates", () => {
  const random = jest.spyOn(Math, "random").mockReturnValue(0.5);
  let state = manageScores(undefined, {
    type: "PICK_TEAMS",
    payload: {
      team1: "India",
      team2: "Australia",
      overs: 20,
      format: "T20",
      team1PlayingXI: getDefaultXI(squadCatalog, "India", "T20"),
      team2PlayingXI: getDefaultXI(squadCatalog, "Australia", "T20"),
    },
  });
  const dispatchedTypes = [];
  const getState = () => ({ manageScores: state });
  const dispatch = (action) => {
    dispatchedTypes.push(action.type);
    state = manageScores(state, action);
  };

  simulateMatch("Normal")(dispatch, getState);

  expect(dispatchedTypes).toEqual([
    "SCORE_MANY",
    "COMPLETE",
    "SCORE_MANY",
    "COMPLETE",
  ]);
  expect(state.gameover).toBe(true);
  expect(
    Object.values(state.team2BowlingStats).reduce(
      (total, figures) => total + figures.balls,
      0
    )
  ).toBe(state.team1BallsFaced);
  expect(
    Object.values(state.team1BowlingStats).reduce(
      (total, figures) => total + figures.balls,
      0
    )
  ).toBe(state.team2BallsFaced);
  expect(
    Object.values(state.team1BowlingStats).reduce(
      (total, figures) => total + figures.runs,
      0
    )
  ).toBe(state.team2Total);
  random.mockRestore();
});
