import { render, screen } from "@testing-library/react";
import { MatchComponent } from "./MatchComponent";

const completedMatch = {
  gameover: true,
  team1: "India",
  team2: "Australia",
  currentTeamBatting: "Australia",
  team1Total: 170,
  team2Total: 160,
  team1Wickets: 6,
  team2Wickets: 8,
  team1BallsFaced: 120,
  team2BallsFaced: 120,
  onStrike: { batterIndex: 8 },
  offStrike: { batterIndex: 7 },
  team1PlayingXI: [],
  team2PlayingXI: [],
  team1Stats: {},
  team2Stats: {},
  team1BallsFacedByPlayer: {},
  team2BallsFacedByPlayer: {},
  team1Dismissed: [],
  team2Dismissed: [],
  team1BowlingStats: {},
  team2BowlingStats: {},
  team1BowlingOrder: [],
  team2BowlingOrder: [],
  team1LastPair: { player_1: 0, player_2: 1 },
  team2LastPair: { player_1: 7, player_2: 8 },
};

test("bilateral matches can hide the generic Play Again action", () => {
  const { rerender } = render(
    <MatchComponent
      scoreData={completedMatch}
      resetDispatch={jest.fn()}
      playOverDispatch={jest.fn()}
      hidePlayAgain
    />
  );

  expect(screen.queryByText("Play Again")).not.toBeInTheDocument();

  rerender(
    <MatchComponent
      scoreData={completedMatch}
      resetDispatch={jest.fn()}
      playOverDispatch={jest.fn()}
    />
  );

  expect(screen.getByText("Play Again")).toBeInTheDocument();
});
