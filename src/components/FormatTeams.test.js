import React from "react";
import {
  fireEvent,
  render,
  screen,
  within,
  waitFor,
} from "@testing-library/react";
import squadCatalog from "../data/cric-vfinal.json";
import TournamentSetup from "./TournamentSetup";
import BilateralSetup from "./BilateralSetup";

const changeOvers = async (current, next) => {
  fireEvent.mouseDown(screen.getByRole("button", { name: current }));
  fireEvent.click(within(screen.getByRole("listbox")).getByText(next));
  await waitFor(() =>
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
  );
};

test("tournaments include Bangladesh at 40 overs and remove it on a format switch", async () => {
  render(
    <TournamentSetup
      teamData={squadCatalog}
      onStartTournament={jest.fn()}
      onBack={jest.fn()}
    />
  );
  expect(screen.queryByLabelText("Bangladesh")).not.toBeInTheDocument();
  await changeOvers("ODI (50 Overs)", "ODI (40 Overs)");
  fireEvent.click(screen.getByLabelText("Bangladesh"));
  expect(screen.getByLabelText("Bangladesh")).toBeChecked();
  await changeOvers("ODI (40 Overs)", "ODI (50 Overs)");
  expect(screen.queryByLabelText("Bangladesh")).not.toBeInTheDocument();
  expect(screen.getByText("Selected: 0/9")).toBeInTheDocument();
});

test("bilateral team options include Bangladesh only at 40 overs", async () => {
  render(
    <BilateralSetup
      teamData={squadCatalog}
      onStartSeries={jest.fn()}
      onBack={jest.fn()}
    />
  );
  await changeOvers("ODI (50 Overs)", "ODI (40 Overs)");
  fireEvent.mouseDown(
    screen.getByText("NewZealand").closest('[role="button"]')
  );
  fireEvent.click(within(screen.getByRole("listbox")).getByText("Bangladesh"));
  await waitFor(() =>
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
  );
  expect(screen.getByText("Bangladesh")).toBeInTheDocument();
  await changeOvers("ODI (40 Overs)", "ODI (50 Overs)");
  expect(screen.queryByText("Bangladesh")).not.toBeInTheDocument();
});

test("switching away from Bangladesh as first team keeps the opponents distinct", async () => {
  const onStartSeries = jest.fn();
  render(
    <BilateralSetup
      teamData={squadCatalog}
      onStartSeries={onStartSeries}
      onBack={jest.fn()}
    />
  );
  await changeOvers("ODI (50 Overs)", "ODI (40 Overs)");
  fireEvent.mouseDown(screen.getByRole("button", { name: "India" }));
  fireEvent.click(within(screen.getByRole("listbox")).getByText("Bangladesh"));
  await waitFor(() =>
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
  );
  fireEvent.mouseDown(screen.getByRole("button", { name: "NewZealand" }));
  fireEvent.click(within(screen.getByRole("listbox")).getByText("India"));
  await waitFor(() =>
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
  );
  await changeOvers("ODI (40 Overs)", "ODI (50 Overs)");
  fireEvent.click(screen.getByRole("button", { name: /Start Series/i }));
  const config = onStartSeries.mock.calls[0][0];
  expect(config.team1).not.toBe(config.team2);
  expect(config.team1).not.toBe("Bangladesh");
  expect(config.team2).toBe("India");
});
