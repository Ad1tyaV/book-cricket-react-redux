import { fireEvent, render, screen } from "@testing-library/react";
import TournamentSetup from "./TournamentSetup";

test("three selected teams start a double round-robin tri-series", () => {
  const onStartTournament = jest.fn();
  render(
    <TournamentSetup
      teams={["India", "Australia", "England"]}
      onStartTournament={onStartTournament}
      onBack={jest.fn()}
    />
  );

  fireEvent.click(screen.getByLabelText("India"));
  fireEvent.click(screen.getByLabelText("Australia"));
  fireEvent.click(screen.getByLabelText("England"));
  fireEvent.click(screen.getByText("Start Tournament"));

  expect(onStartTournament).toHaveBeenCalledWith(
    expect.objectContaining({
      teams: ["India", "Australia", "England"],
      structure: "round_robin",
    })
  );
});

test("four or more teams can explicitly select a two-group stage", () => {
  const onStartTournament = jest.fn();
  render(
    <TournamentSetup
      teams={["India", "Australia", "England", "Pakistan"]}
      onStartTournament={onStartTournament}
      onBack={jest.fn()}
    />
  );

  fireEvent.click(screen.getByText("Select All Teams"));
  fireEvent.mouseDown(screen.getByLabelText("Tournament Structure"));
  fireEvent.click(screen.getByText("Two-Group Stage"));
  fireEvent.click(screen.getByText("Start Tournament"));

  expect(onStartTournament).toHaveBeenCalledWith(
    expect.objectContaining({ structure: "group_stage" })
  );
});
