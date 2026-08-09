import { formatOvers, getInningsBallsFaced } from "./matchResultHelper";

test("formats balls as cricket overs", () => {
  expect(formatOvers(165)).toBe("27.3");
  expect(formatOvers(132)).toBe("22.0");
});

test("derives innings balls from batter records for older saved matches", () => {
  const scoreData = {
    team1BallsFacedByPlayer: { 0: 77, 1: 41, 2: 2, 3: 45 },
  };

  expect(getInningsBallsFaced(scoreData, "team1")).toBe(165);
});
