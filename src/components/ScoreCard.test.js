import { render, screen } from "@testing-library/react";
import ScoreCard from "./ScoreCard";
import squadCatalog from "../data/cric-vfinal.json";
import { getDefaultXI } from "../helpers/teamHelpers";

test("scorecard uses dismissed state before marking the final pair not out", () => {
  const indiaXI = getDefaultXI(squadCatalog, "India", "ODI_50");
  const englandXI = getDefaultXI(squadCatalog, "England", "ODI_50");

  render(
    <ScoreCard
      track={{
        team1: { player_1: 0, player_2: 1 },
        team2: { player_1: 2, player_2: 3 },
      }}
      team1PlayingXI={indiaXI}
      team2PlayingXI={englandXI}
      team1Stats={{}}
      team2Stats={{}}
      team1BallsFacedByPlayer={{}}
      team2BallsFacedByPlayer={{}}
      team1Dismissed={[0]}
      team2Dismissed={[]}
    />
  );

  expect(screen.getByText("Shubman Gill")).toHaveStyle("color: red");
  expect(screen.getByText("Rohit Sharma")).toHaveStyle("color: #72ff72");
});
