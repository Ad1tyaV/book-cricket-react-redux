import { render, screen, within } from "@testing-library/react";
import StatsTab from "./StatsTab";

const bowlingPlayer = (name, wickets, ballsBowled, runsConceded) => ({
  name,
  team: "India",
  runs: 0,
  balls: 0,
  strikeRate: 0,
  wickets,
  ballsBowled,
  runsConceded,
});

test("bowling leaderboards enforce wicket and overs qualification", () => {
  render(
    <StatsTab
      playerStats={[
        bowlingPlayer("Bowler A", 6, 36, 30),
        bowlingPlayer("Bowler B", 4, 30, 20),
        bowlingPlayer("Bowler C", 5, 24, 25),
        bowlingPlayer("Bowler D", 1, 29, 20),
      ]}
    />
  );

  expect(
    screen.getByText("Top 5 Wicket Takers (min 5 wickets)")
  ).toBeInTheDocument();
  expect(
    screen.getByText("Top 5 Economy Rates (min 5 overs)")
  ).toBeInTheDocument();
  expect(screen.getAllByText("Bowler A")).toHaveLength(2);
  expect(screen.getByText("Bowler B")).toBeInTheDocument();
  expect(screen.getByText("Bowler C")).toBeInTheDocument();
  expect(screen.queryByText("Bowler D")).not.toBeInTheDocument();

  const economyTable = screen.getByRole("table", {
    name: "economy leaderboard",
  });
  expect(within(economyTable).getByText("Wkts")).toBeInTheDocument();
  expect(within(economyTable).getByText("6")).toBeInTheDocument();
});
