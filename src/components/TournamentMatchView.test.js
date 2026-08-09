import { fireEvent, render, screen, within } from "@testing-library/react";
import TournamentMatchView from "./TournamentMatchView";

jest.mock("./MatchComponent", () => () => <div>Live match</div>);

const createXI = (prefix) =>
  Array.from({ length: 11 }, (_, index) => ({
    name: `${prefix} ${index + 1}`,
    batting: 70,
    attacking: 70,
    bowling: 70 + index,
  }));

const scoreData = {
  team1: "India",
  team2: "Australia",
  currentTeamBatting: "Australia",
  innings: 2,
  format: "T20",
  onStrike: { batterIndex: 0 },
  offStrike: { batterIndex: 1 },
  team1Total: 165,
  team1Wickets: 7,
  team1BallsFaced: 120,
  team2Total: 42,
  team2Wickets: 2,
  team2BallsFaced: 30,
  team1PlayingXI: createXI("India Player"),
  team2PlayingXI: createXI("Australia Player"),
  team1Stats: { 0: 80, 1: 40 },
  team2Stats: { 0: 25, 1: 12 },
  team1BallsFacedByPlayer: { 0: 55, 1: 35 },
  team2BallsFacedByPlayer: { 0: 18, 1: 12 },
  team1Dismissed: [2, 3, 4, 5, 6, 7, 8],
  team2Dismissed: [2, 3],
  team1LastPair: { player_1: 0, player_2: 1 },
  team2LastPair: { player_1: 0, player_2: 1 },
  team1BowlingStats: { 10: { balls: 12, runs: 14, wickets: 2 } },
  team2BowlingStats: { 10: { balls: 24, runs: 30, wickets: 3 } },
  team1BowlingOrder: [10],
  team2BowlingOrder: [10],
};

test("innings scorecards show batting and bowling figures for both innings", () => {
  render(
    <TournamentMatchView
      pitchType="Normal"
      standings={[]}
      playerStats={[]}
      currentStage="Group Stage"
      scoreData={scoreData}
    />
  );

  fireEvent.click(screen.getByText("Innings Scorecards"));

  expect(screen.getByText("Australia Batting")).toBeInTheDocument();
  expect(screen.getByText("India Bowling")).toBeInTheDocument();
  expect(
    within(screen.getByRole("table", { name: "bowling scorecard" })).getByText(
      "India Player 11"
    )
  ).toBeInTheDocument();

  fireEvent.click(screen.getByText("First Innings · India"));

  expect(screen.getByText("India Batting")).toBeInTheDocument();
  expect(screen.getByText("Australia Bowling")).toBeInTheDocument();
  expect(
    within(screen.getByRole("table", { name: "bowling scorecard" })).getByText(
      "Australia Player 11"
    )
  ).toBeInTheDocument();
});
