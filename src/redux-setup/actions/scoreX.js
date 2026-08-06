const scoreX = (team, pitch) => {
  return (dispatch, getState) => {
    dispatch({ type: "SCORE", payload: { pitchType: pitch } });
    const state = getState().manageScores;
    const battingFirst = state.currentTeamBatting === state.team1;
    const inningsDone = battingFirst
      ? state.team1Wickets >= 10 || state.team1BallsFaced >= state.overs * 6
      : state.team2Wickets >= 10 ||
        state.team2BallsFaced >= state.overs * 6 ||
        state.team2Total > state.team1Total;

    if (inningsDone) dispatch({ type: "COMPLETE" });
  };
};
export default scoreX;

export const playOvers = (overs, pitch) => {
  return (dispatch, getState) => {
    const deliveries = Math.max(1, Number(overs) || 1) * 6;
    dispatch({
      type: "SCORE_MANY",
      payload: { deliveries, pitchType: pitch },
    });

    const state = getState().manageScores;
    const battingFirst = state.currentTeamBatting === state.team1;
    const inningsDone = battingFirst
      ? state.team1Wickets >= 10 || state.team1BallsFaced >= state.overs * 6
      : state.team2Wickets >= 10 ||
        state.team2BallsFaced >= state.overs * 6 ||
        state.team2Total > state.team1Total;
    if (inningsDone) dispatch({ type: "COMPLETE" });
  };
};
