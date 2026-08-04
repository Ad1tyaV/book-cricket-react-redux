import RandomWithIndex from "../../helpers/improvedRandomNumber";
import { getBowlingStrength } from "../../helpers/teamHelpers";

const createInitialState = () => ({
  team1: "",
  team2: "",
  currentTeamBatting: "",
  onStrike: { batterIndex: 0 },
  offStrike: { batterIndex: 1 },
  team1PlayingXI: [],
  team2PlayingXI: [],
  team1BowlingStrength: 70,
  team2BowlingStrength: 70,
  team1Stats: {},
  team2Stats: {},
  team1BallsFacedByPlayer: {},
  team2BallsFacedByPlayer: {},
  team1Mindsets: {},
  team2Mindsets: {},
  team1Dismissed: [],
  team2Dismissed: [],
  innings: 0,
  team1Total: 0,
  team2Total: 0,
  team1Wickets: 0,
  team2Wickets: 0,
  gameover: false,
  team1BallsFaced: 0,
  team2BallsFaced: 0,
  team1LastPair: { player_1: 0, player_2: 1 },
  team2LastPair: { player_1: 0, player_2: 1 },
  overs: 50,
  format: "ODI_50",
});

const initialState = createInitialState();

const swapStrike = (state) => ({
  ...state,
  onStrike: { batterIndex: state.offStrike.batterIndex },
  offStrike: { batterIndex: state.onStrike.batterIndex },
});

const activeInnings = (state) =>
  state.currentTeamBatting === state.team1 ? "team1" : "team2";

const inningsIsComplete = (state, side) =>
  state[`${side}Wickets`] >= 10 ||
  state[`${side}BallsFaced`] >= state.overs * 6 ||
  (side === "team2" && state.team2Total > state.team1Total);

const scoreRunsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SCORE_MANY": {
      const deliveries = Math.max(0, Number(action.payload.deliveries) || 0);
      const startingTeam = state.currentTeamBatting;
      const startingSide = activeInnings(state);
      const startingWickets = state[`${startingSide}Wickets`];
      let nextState = state;

      for (let delivery = 0; delivery < deliveries; delivery++) {
        const side = activeInnings(nextState);
        if (
          nextState.gameover ||
          nextState.currentTeamBatting !== startingTeam ||
          inningsIsComplete(nextState, side)
        ) {
          break;
        }

        const previousState = nextState;
        nextState = scoreRunsReducer(nextState, {
          type: "SCORE",
          payload: { pitchType: action.payload.pitchType },
        });
        if (nextState === previousState) break;
        if (
          action.payload.stopOnWicket &&
          nextState[`${startingSide}Wickets`] > startingWickets
        ) {
          break;
        }
      }

      return nextState;
    }

    case "SCORE": {
      if (state.gameover || !state.currentTeamBatting) return state;

      const side = activeInnings(state);
      if (inningsIsComplete(state, side)) return state;

      const opponent = side === "team1" ? "team2" : "team1";
      const strikerIndex = state.onStrike.batterIndex;
      const batter = state[`${side}PlayingXI`][strikerIndex];
      const bowlingStrength = state[`${opponent}BowlingStrength`];
      const ballsFaced = state[`${side}BallsFaced`];
      const total = state[`${side}Total`];
      const wickets = state[`${side}Wickets`];
      const nextBall = ballsFaced + 1;
      const batterBallsFaced =
        state[`${side}BallsFacedByPlayer`][strikerIndex] || 0;

      // A delivery can only be faced by one of the explicitly selected eleven.
      if (!batter || strikerIndex < 0 || strikerIndex > 10) return state;

      const gameState = {
        ballsFaced,
        currentScore: total,
        targetScore: side === "team2" ? state.team1Total + 1 : null,
        wicketsLost: wickets,
        batterIndex: strikerIndex,
        battingRating: batter.batting,
        attackingRating: batter.attacking,
        bowlingRating: bowlingStrength,
        batterBallsFaced,
        mindset: state[`${side}Mindsets`][strikerIndex] || "default",
      };
      const outcome = RandomWithIndex(
        strikerIndex,
        action.payload.pitchType,
        state.format,
        gameState
      );

      let nextState = {
        ...state,
        [`${side}BallsFaced`]: nextBall,
        [`${side}BallsFacedByPlayer`]: {
          ...state[`${side}BallsFacedByPlayer`],
          [strikerIndex]:
            (state[`${side}BallsFacedByPlayer`][strikerIndex] || 0) + 1,
        },
      };

      if (outcome === -1) {
        const nextWickets = wickets + 1;
        nextState = {
          ...nextState,
          [`${side}Wickets`]: nextWickets,
          [`${side}Dismissed`]: [...state[`${side}Dismissed`], strikerIndex],
        };

        if (nextWickets < 10) {
          nextState.onStrike = { batterIndex: nextWickets + 1 };
        }
      } else {
        nextState = {
          ...nextState,
          [`${side}Total`]: total + outcome,
          [`${side}Stats`]: {
            ...state[`${side}Stats`],
            [strikerIndex]:
              (state[`${side}Stats`][strikerIndex] || 0) + outcome,
          },
        };

        if (outcome % 2 === 1) nextState = swapStrike(nextState);
      }

      // End-of-over strike rotation happens after any run/wicket rotation.
      if (nextBall % 6 === 0 && nextWicketsArePlayable(nextState, side)) {
        nextState = swapStrike(nextState);
      }

      return nextState;
    }

    case "COMPLETE": {
      if (state.gameover || !state.currentTeamBatting) return state;

      if (state.currentTeamBatting === state.team1) {
        return {
          ...state,
          team1LastPair: {
            player_1: state.onStrike.batterIndex,
            player_2: state.offStrike.batterIndex,
          },
          currentTeamBatting: state.team2,
          innings: 2,
          onStrike: { batterIndex: 0 },
          offStrike: { batterIndex: 1 },
        };
      }

      if (inningsIsComplete(state, "team2")) {
        return {
          ...state,
          team2LastPair: {
            player_1: state.onStrike.batterIndex,
            player_2: state.offStrike.batterIndex,
          },
          gameover: true,
        };
      }
      return state;
    }

    case "RESET_STATE":
      return createInitialState();

    case "SET_BATTER_MINDSET": {
      const side =
        action.payload.team === state.team1
          ? "team1"
          : action.payload.team === state.team2
          ? "team2"
          : null;
      const batterIndex = Number(action.payload.batterIndex);
      const validMindsets = ["defensive", "default", "aggressive"];
      const isAtCrease =
        batterIndex === state.onStrike.batterIndex ||
        batterIndex === state.offStrike.batterIndex;

      if (
        !side ||
        action.payload.team !== state.currentTeamBatting ||
        !isAtCrease ||
        !validMindsets.includes(action.payload.mindset) ||
        state[`${side}Dismissed`].includes(batterIndex)
      ) {
        return state;
      }

      return {
        ...state,
        [`${side}Mindsets`]: {
          ...state[`${side}Mindsets`],
          [batterIndex]: action.payload.mindset,
        },
      };
    }

    case "PICK_TEAMS": {
      const next = createInitialState();
      const team1PlayingXI = (action.payload.team1PlayingXI || []).slice(0, 11);
      const team2PlayingXI = (action.payload.team2PlayingXI || []).slice(0, 11);
      return {
        ...next,
        team1: action.payload.team1,
        team2: action.payload.team2,
        currentTeamBatting: action.payload.team1,
        innings: 1,
        overs: action.payload.overs || 50,
        format: action.payload.format || "ODI_50",
        team1PlayingXI,
        team2PlayingXI,
        team1BowlingStrength: getBowlingStrength(team1PlayingXI),
        team2BowlingStrength: getBowlingStrength(team2PlayingXI),
      };
    }

    default:
      return state;
  }
};

const nextWicketsArePlayable = (state, side) => state[`${side}Wickets`] < 10;

export { createInitialState, inningsIsComplete };
export default scoreRunsReducer;
