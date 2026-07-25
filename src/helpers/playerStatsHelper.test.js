import { mergeInningsBattingStats } from "./playerStatsHelper";

test("bilateral batting stats accumulate across innings", () => {
  const xi = [
    { name: "Opener", id: "opener" },
    { name: "Partner", id: "partner" },
  ];
  const firstMatch = mergeInningsBattingStats(
    [],
    "Example",
    xi,
    { 0: 40, 1: 10 },
    { 0: 30, 1: 12 }
  );
  const secondMatch = mergeInningsBattingStats(
    firstMatch,
    "Example",
    xi,
    { 0: 60 },
    { 0: 42 }
  );

  expect(secondMatch[0]).toMatchObject({
    name: "Opener",
    runs: 100,
    balls: 72,
    innings: 2,
  });
  expect(secondMatch[0].strikeRate).toBeCloseTo(138.89, 1);
});
