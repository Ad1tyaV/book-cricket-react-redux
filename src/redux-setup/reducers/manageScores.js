import RandomWithIndex from "../../helpers/improvedRandomNumber";

const initialState = {
  team1: "",
  team2: "",
  currentTeamBatting: "",
  onStrike: { batterIndex: -1 },
  offStrike: { batterIndex: 0 },
  team1Stats: {},
  team2Stats: {},
  team1BallsFacedByPlayer: {},
  team2BallsFacedByPlayer: {},
  innings: 0,
  team1Total: 0,
  team2Total: 0,
  team1Wickets: 0,
  team2Wickets: 0,
  gameover: false,
  team1BallsFaced: 0,
  team2BallsFaced: 0,
  overs: 50,
  format: "ODI_50",
};

const scoreRunsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SCORE": {
      let pitchType = action.payload.pitchType;
      if (state.gameover) return state;
      // Create game state for improved random number generation
      const gameState = {
        ballsFaced: state.currentTeamBatting === state.team1 ? state.team1BallsFaced : state.team2BallsFaced,
        currentScore: state.currentTeamBatting === state.team1 ? state.team1Total : state.team2Total,
        targetScore: state.currentTeamBatting === state.team2 ? state.team1Total + 1 : null,
        wicketsLost: state.currentTeamBatting === state.team1 ? state.team1Wickets : state.team2Wickets,
        batterIndex: state.onStrike.batterIndex
      };
      
      let updatedRun = RandomWithIndex(state.onStrike.batterIndex, pitchType, state.format, gameState);
      //console.log(updatedRun);
      //console.log("Updated Run:"+updatedRun)
      // console.log(state.onStrike.batterIndex, state.offStrike.batterIndex, updatedRun)
      if (updatedRun === -1) {
        if (
          state.currentTeamBatting === state.team1 &&
          state.team1Wickets !== 10
        ) {
          //console.log(state.onStrike.batterIndex)
          //console.log('wicket')
          let newstate = {
            ...state,
            offStrike: {
              ...state.offStrike,
              batterIndex: state.offStrike.batterIndex,
            },
            onStrike: {
              ...state.onStrike,
              batterIndex:
                state.onStrike.batterIndex > state.offStrike.batterIndex
                  ? state.onStrike.batterIndex + 1
                  : state.offStrike.batterIndex + 1,
            },
            team1Wickets:
              state.onStrike.batterIndex > state.offStrike.batterIndex
                ? state.onStrike.batterIndex + 1
                : state.offStrike.batterIndex + 1,
            team1BallsFaced: state.team1BallsFaced + 1,
            team1BallsFacedByPlayer: {
              ...state.team1BallsFacedByPlayer,
              [state.onStrike.batterIndex]: (state.team1BallsFacedByPlayer[state.onStrike.batterIndex] || 0) + 1
            }
          };
          return newstate.team1BallsFaced % 6 === 0
            ? {
                ...newstate,
                onStrike: {
                  ...newstate.onStrike,
                  batterIndex: newstate.offStrike.batterIndex,
                },
                offStrike: {
                  ...newstate.offStrike,
                  batterIndex: newstate.onStrike.batterIndex,
                },
              }
            : newstate;
        } else if (
          state.currentTeamBatting === state.team2 &&
          state.team2Wickets !== 10
        ) {
          let newstate = {
            ...state,
            offStrike: {
              ...state.offStrike,
              batterIndex: state.offStrike.batterIndex,
            },
            onStrike: {
              ...state.onStrike,
              batterIndex:
                state.onStrike.batterIndex > state.offStrike.batterIndex
                  ? state.onStrike.batterIndex + 1
                  : state.offStrike.batterIndex + 1,
            },
            team2Wickets:
              state.onStrike.batterIndex > state.offStrike.batterIndex
                ? state.onStrike.batterIndex + 1
                : state.offStrike.batterIndex + 1,
            team2BallsFaced: state.team2BallsFaced + 1,
            team2BallsFacedByPlayer: {
              ...state.team2BallsFacedByPlayer,
              [state.onStrike.batterIndex]: (state.team2BallsFacedByPlayer[state.onStrike.batterIndex] || 0) + 1
            }
          };
          return newstate.team2BallsFaced % 6 === 0
            ? {
                ...newstate,
                onStrike: {
                  ...newstate.onStrike,
                  batterIndex: newstate.offStrike.batterIndex,
                },
                offStrike: {
                  ...newstate.offStrike,
                  batterIndex: newstate.onStrike.batterIndex,
                },
              }
            : newstate;
        } else return state;
      } else {
        if (updatedRun === 0) {
          if (state.currentTeamBatting === state.team1) {
            let newstate = {
              ...state,
              team1BallsFaced: state.team1BallsFaced + 1,
              team1BallsFacedByPlayer: {
                ...state.team1BallsFacedByPlayer,
                [state.onStrike.batterIndex]: (state.team1BallsFacedByPlayer[state.onStrike.batterIndex] || 0) + 1
              }
            };
            return newstate.team1BallsFaced % 6 === 0
              ? {
                  ...newstate,
                  onStrike: {
                    ...newstate.onStrike,
                    batterIndex: newstate.offStrike.batterIndex,
                  },
                  offStrike: {
                    ...newstate.offStrike,
                    batterIndex: newstate.onStrike.batterIndex,
                  },
                }
              : newstate;
          } else {
            let newstate = {
              ...state,
              team2BallsFaced: state.team2BallsFaced + 1,
              team2BallsFacedByPlayer: {
                ...state.team2BallsFacedByPlayer,
                [state.onStrike.batterIndex]: (state.team2BallsFacedByPlayer[state.onStrike.batterIndex] || 0) + 1
              }
            };
            return newstate.team1BallsFaced % 6 === 0
              ? {
                  ...newstate,
                  onStrike: {
                    ...newstate.onStrike,
                    batterIndex: newstate.offStrike.batterIndex,
                  },
                  offStrike: {
                    ...newstate.offStrike,
                    batterIndex: newstate.onStrike.batterIndex,
                  },
                }
              : newstate;
          }
        } else if (updatedRun % 2) {
          if (
            state.currentTeamBatting === state.team1 &&
            state.team1Wickets !== 10
          ) {
            let newstate = {
              ...state,
              team1Total: state.team1Total + updatedRun,
              team1Stats: {
                ...state.team1Stats,
                [state.onStrike.batterIndex]:
                  (state.team1Stats[state.onStrike.batterIndex] ?? 0) +
                  updatedRun,
              },
              team1BallsFaced: state.team1BallsFaced + 1,
              team1BallsFacedByPlayer: {
                ...state.team1BallsFacedByPlayer,
                [state.onStrike.batterIndex]: (state.team1BallsFacedByPlayer[state.onStrike.batterIndex] || 0) + 1
              },
              onStrike: {
                ...state.onStrike,
                batterIndex: state.offStrike.batterIndex,
              },
              offStrike: {
                ...state.offStrike,
                batterIndex: state.onStrike.batterIndex,
              },
            };
            return newstate.team1BallsFaced % 6 === 0
              ? {
                  ...newstate,
                  onStrike: {
                    ...newstate.onStrike,
                    batterIndex: newstate.offStrike.batterIndex,
                  },
                  offStrike: {
                    ...newstate.offStrike,
                    batterIndex: newstate.onStrike.batterIndex,
                  },
                }
              : newstate;
          } else if (
            state.currentTeamBatting === state.team2 &&
            state.team2Wickets !== 10 &&
            state.team2Total <= state.team1Total
          ) {
            let newstate = {
              ...state,
              team2Total: state.team2Total + updatedRun,
              team2Stats: {
                ...state.team2Stats,
                [state.onStrike.batterIndex]:
                  (state.team2Stats[state.onStrike.batterIndex] ?? 0) +
                  updatedRun,
              },
              team2BallsFaced: state.team2BallsFaced + 1,
              team2BallsFacedByPlayer: {
                ...state.team2BallsFacedByPlayer,
                [state.onStrike.batterIndex]: (state.team2BallsFacedByPlayer[state.onStrike.batterIndex] || 0) + 1
              },
              onStrike: {
                ...state.onStrike,
                batterIndex: state.offStrike.batterIndex,
              },
              offStrike: {
                ...state.offStrike,
                batterIndex: state.onStrike.batterIndex,
              },
            };
            return newstate.team2BallsFaced % 6 === 0
              ? {
                  ...newstate,
                  onStrike: {
                    ...newstate.onStrike,
                    batterIndex: newstate.offStrike.batterIndex,
                  },
                  offStrike: {
                    ...newstate.offStrike,
                    batterIndex: newstate.onStrike.batterIndex,
                  },
                }
              : newstate;
          } else return state;
        } else {
          if (
            state.currentTeamBatting === state.team1 &&
            state.team1Wickets !== 10
          ) {
            let newstate = {
              ...state,
              team1Total: state.team1Total + updatedRun,
              team1Stats: {
                ...state.team1Stats,
                [state.onStrike.batterIndex]:
                  (state.team1Stats[state.onStrike.batterIndex] ?? 0) +
                  updatedRun,
              },
              team1BallsFaced: state.team1BallsFaced + 1,
              team1BallsFacedByPlayer: {
                ...state.team1BallsFacedByPlayer,
                [state.onStrike.batterIndex]: (state.team1BallsFacedByPlayer[state.onStrike.batterIndex] || 0) + 1
              },
            };
            return newstate.team1BallsFaced % 6 === 0
              ? {
                  ...newstate,
                  onStrike: {
                    ...newstate.onStrike,
                    batterIndex: newstate.offStrike.batterIndex,
                  },
                  offStrike: {
                    ...newstate.offStrike,
                    batterIndex: newstate.onStrike.batterIndex,
                  },
                }
              : newstate;
          } else if (
            state.currentTeamBatting === state.team2 &&
            state.team2Wickets !== 10 &&
            state.team2Total <= state.team1Total
          ) {
            let newstate = {
              ...state,
              team2Total: state.team2Total + updatedRun,
              team2Stats: {
                ...state.team2Stats,
                [state.onStrike.batterIndex]:
                  (state.team2Stats[state.onStrike.batterIndex] ?? 0) +
                  updatedRun,
              },
              team2BallsFaced: state.team2BallsFaced + 1,
              team2BallsFacedByPlayer: {
                ...state.team2BallsFacedByPlayer,
                [state.onStrike.batterIndex]: (state.team2BallsFacedByPlayer[state.onStrike.batterIndex] || 0) + 1
              },
            };
            return newstate.team2BallsFaced % 6 === 0
              ? {
                  ...newstate,
                  onStrike: {
                    ...newstate.onStrike,
                    batterIndex: newstate.offStrike.batterIndex,
                  },
                  offStrike: {
                    ...newstate.offStrike,
                    batterIndex: newstate.onStrike.batterIndex,
                  },
                }
              : newstate;
          } else return state;
        }
      }
    }
    case "COMPLETE": {
      if (state.currentTeamBatting === state.team1) {
        return {
          ...state,
          currentTeamBatting: state.team2,
          onStrike: { batterIndex: -1 },
          offStrike: { batterIndex: 0 },
        };
      } else if (
        state.currentTeamBatting === state.team2 &&
        (state.team2Wickets === 10 || state.team2BallsFaced === state.overs * 6)
      ) {
        return {
          ...state,
          gameover: true,
        };
      } else if (
        state.currentTeamBatting === state.team2 &&
        state.team2Total > state.team1Total
      ) {
        return {
          ...state,
          gameover: true,
        };
      } else return state;
    }
    case "RESET_STATE":
      return {
        team1: "",
        team2: "",
        currentTeamBatting: "",
        onStrike: { batterIndex: -1 },
        offStrike: { batterIndex: 0 },
        team1Stats: {},
        team2Stats: {},
        team1BallsFacedByPlayer: {},
        team2BallsFacedByPlayer: {},
        innings: 0,
        team1Total: 0,
        team2Total: 0,
        team1Wickets: 0,
        team2Wickets: 0,
        gameover: false,
        team1BallsFaced: 0,
        team2BallsFaced: 0,
        overs: 50,
        format: "ODI_50"
      };
    case "PICK_TEAMS":
      return {
        ...state,
        team1: action.payload.team1,
        team2: action.payload.team2,
        overs: action.payload.overs || 50,
        format: action.payload.format || "ODI_50",
        gameover: false,
        currentTeamBatting: action.payload.team1,
        team1BallsFaced: 0,
        team2BallsFaced: 0,
        team1BallsFacedByPlayer: {},
        team2BallsFacedByPlayer: {},
        team1Stats: {},
        team2Stats: {},
        team1Total: 0,
        team2Total: 0,
        team1Wickets: 0,
        team2Wickets: 0,
        innings: 0,
        onStrike: { batterIndex: -1 },
        offStrike: { batterIndex: 0 }
      };
    default:
      return state;
  }
};

export default scoreRunsReducer;
