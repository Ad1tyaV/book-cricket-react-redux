import { render, screen } from "@testing-library/react";
import PostMatchView from "./PostMatchView";

test("match details show both teams' overs", () => {
  render(
    <PostMatchView
      standings={[]}
      playerStats={[]}
      currentStage="Group Stage"
      scoreData={{
        team1: "Pakistan",
        team2: "India",
        team1Total: 137,
        team2Total: 143,
        team1Wickets: 10,
        team2Wickets: 6,
        team1BallsFaced: 165,
        team2BallsFaced: 132,
        team1Stats: {},
        team2Stats: {},
        team1BallsFacedByPlayer: {},
        team2BallsFacedByPlayer: {},
        team1PlayingXI: [],
        team2PlayingXI: [],
        team1Dismissed: [],
        team2Dismissed: [],
      }}
      teamData={{}}
      track={{}}
      onNextMatch={jest.fn()}
      onExit={jest.fn()}
      showNextButton={false}
      resultOverride="India won by 4 wickets"
    />
  );

  expect(
    screen.getByText(
      "Pakistan: 137/10 (27.3 overs) | India: 143/6 (22.0 overs)"
    )
  ).toBeInTheDocument();
});
