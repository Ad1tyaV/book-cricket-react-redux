import { addMatchToPlayerStats } from "./tournamentStats";

const team1PlayingXI = [
  { name: "Opener", batting: 85, bowling: 10 },
  { name: "Strike Bowler", batting: 20, bowling: 92 },
];
const team2PlayingXI = [
  { name: "Chaser", batting: 84, bowling: 12 },
  { name: "Control Bowler", batting: 30, bowling: 88 },
];

const match = {
  team1: "Alpha",
  team2: "Beta",
  team1PlayingXI,
  team2PlayingXI,
  team1Stats: { 0: 60 },
  team2Stats: { 0: 45 },
  team1BallsFacedByPlayer: { 0: 40 },
  team2BallsFacedByPlayer: { 0: 36 },
  team1BowlingStats: { 1: { balls: 24, runs: 20, wickets: 3 } },
  team2BowlingStats: { 1: { balls: 24, runs: 28, wickets: 2 } },
};

test("tournament player stats accumulate batting and bowling records", () => {
  const once = addMatchToPlayerStats([], match);
  const twice = addMatchToPlayerStats(once, match);
  const strikeBowler = twice.find(
    ({ name, team }) => name === "Strike Bowler" && team === "Alpha"
  );
  const opener = twice.find(
    ({ name, team }) => name === "Opener" && team === "Alpha"
  );

  expect(strikeBowler).toMatchObject({
    wickets: 6,
    runsConceded: 40,
    ballsBowled: 48,
    economy: 5,
  });
  expect(opener).toMatchObject({
    runs: 120,
    balls: 80,
    strikeRate: 150,
  });
});
