import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import squadCatalog from "../data/cric-vfinal.json";
import { getDefaultXI, getSquad } from "../helpers/teamHelpers";
import TournamentManager from "./TournamentManager";

jest.mock("./TournamentMatchView", () => () => <div>Live match</div>);
jest.mock("./FixturesView", () => ({ onSelectMatch, onSimulateMatch }) => (
  <div>
    <button onClick={() => onSelectMatch(1)}>Set up next fixture</button>
    <button onClick={() => onSimulateMatch(3)}>Simulate return fixture</button>
  </div>
));
jest.mock("../redux-setup/actions/pickTeams", () => (...args) => ({
  type: "TEST_PICK_TEAMS",
  args,
}));
jest.mock("../redux-setup/actions/simulateMatch", () => () => ({
  type: "TEST_SIMULATE_MATCH",
}));

test("an edited XI survives another opponent and is reused for simulation", () => {
  jest.useFakeTimers();
  const random = jest.spyOn(Math, "random").mockReturnValue(0.99);
  const picks = [];
  const store = createStore(
    (
      state = {
        getTeams: squadCatalog,
        manageScores: { team1: "", team2: "", gameover: false },
      },
      action
    ) => {
      if (action.type === "TEST_PICK_TEAMS") {
        picks.push(action.args);
        return {
          ...state,
          manageScores: {
            team1: action.args[0],
            team2: action.args[1],
            gameover: false,
          },
        };
      }
      return state;
    }
  );

  try {
    render(
      <Provider store={store}>
        <TournamentManager
          config={{
            teams: ["India", "Australia", "England"],
            format: "ODI_50",
            overs: 50,
          }}
          onExit={jest.fn()}
        />
      </Provider>
    );

    const savedXI = getDefaultXI(squadCatalog, "India", "ODI_50");
    savedXI[0] = getSquad(squadCatalog, "India", "ODI_50")[11];
    [savedXI[0], savedXI[1]] = [savedXI[1], savedXI[0]];

    fireEvent.click(screen.getByRole("button", { name: "Change India XI" }));
    fireEvent.click(screen.getByLabelText("Select Shubman Gill to swap out"));
    fireEvent.click(
      screen.getByLabelText(`Select ${savedXI[1].name} to bring into the XI`)
    );
    fireEvent.click(
      screen.getByRole("button", {
        name: `Swap Shubman Gill for ${savedXI[1].name}`,
      })
    );
    fireEvent.click(
      screen.getByRole("button", {
        name: `Move ${savedXI[1].name} down`,
      })
    );
    fireEvent.click(screen.getByRole("button", { name: "Start Match" }));
    expect(picks[0][4]).toEqual(savedXI);

    fireEvent.click(screen.getByRole("button", { name: "View Fixtures" }));
    fireEvent.click(screen.getByText("Set up next fixture"));
    fireEvent.click(screen.getByRole("button", { name: "Change India XI" }));
    expect(
      screen.getByRole("button", {
        name: `Move ${savedXI[0].name} up`,
      })
    ).toBeDisabled();
    fireEvent.click(screen.getByLabelText("Bowl First"));
    fireEvent.click(screen.getByRole("button", { name: "Start Match" }));
    expect(picks[1][0]).toBe("England");
    expect(picks[1][5]).toEqual(savedXI);

    fireEvent.click(screen.getByRole("button", { name: "View Fixtures" }));
    fireEvent.click(screen.getByText("Simulate return fixture"));
    expect(picks[2][4]).toEqual(savedXI);
  } finally {
    jest.clearAllTimers();
    jest.useRealTimers();
    random.mockRestore();
  }
});
