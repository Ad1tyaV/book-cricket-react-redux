import {
  getFrontlineBowlerIndexes,
  getMaxOversPerBowler,
  selectNextBowlerIndex,
} from "./bowlingHelpers";

const playingXI = Array.from({ length: 11 }, (_, index) => ({
  name: `Player ${index + 1}`,
  bowling: 50 + index,
}));

test("limited-overs workloads use one fifth of the innings quota", () => {
  expect(getMaxOversPerBowler(20)).toBe(4);
  expect(getMaxOversPerBowler(40)).toBe(8);
  expect(getMaxOversPerBowler(50)).toBe(10);
});

test("bowler selection uses the five strongest options without consecutive overs", () => {
  expect(getFrontlineBowlerIndexes(playingXI)).toEqual([10, 9, 8, 7, 6]);

  const nextBowler = selectNextBowlerIndex({
    playingXI,
    bowlingStats: {
      10: { balls: 6, runs: 4, wickets: 1 },
    },
    previousBowlerIndex: 10,
    inningsOvers: 20,
  });

  expect(nextBowler).toBe(9);
});

test("a bowler who reaches the format limit is no longer eligible", () => {
  const nextBowler = selectNextBowlerIndex({
    playingXI,
    bowlingStats: {
      10: { balls: 24, runs: 20, wickets: 2 },
      9: { balls: 18, runs: 18, wickets: 1 },
      8: { balls: 18, runs: 22, wickets: 1 },
      7: { balls: 18, runs: 24, wickets: 0 },
      6: { balls: 18, runs: 25, wickets: 0 },
    },
    previousBowlerIndex: 9,
    inningsOvers: 20,
  });

  expect(nextBowler).toBe(8);
});
