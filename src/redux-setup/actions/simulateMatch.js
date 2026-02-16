import RandomWithIndex from "../../helpers/improvedRandomNumber";

const simulateMatch = (pitchType) => {
  return (dispatch, getState) => {
    const state = getState();
    const { manageScores } = state;
    const maxBalls = manageScores.overs * 6;

    // Simulate entire first innings
    while (
      manageScores.team1Wickets < 10 &&
      manageScores.team1BallsFaced < maxBalls
    ) {
      const gameState = {
        ballsFaced: manageScores.team1BallsFaced,
        currentScore: manageScores.team1Total,
        targetScore: null,
        wicketsLost: manageScores.team1Wickets,
        batterIndex: manageScores.onStrike.batterIndex
      };
      
      dispatch({ type: "SCORE", payload: { pitchType } });
      
      // Get updated state
      const newState = getState().manageScores;
      if (newState.team1Wickets >= 10 || newState.team1BallsFaced >= maxBalls) {
        break;
      }
    }

    // Complete first innings
    dispatch({ type: "COMPLETE", payload: "team1" });

    // Simulate entire second innings
    const updatedState = getState().manageScores;
    while (
      updatedState.team2Wickets < 10 &&
      updatedState.team2BallsFaced < maxBalls &&
      updatedState.team2Total <= updatedState.team1Total
    ) {
      dispatch({ type: "SCORE", payload: { pitchType } });
      
      const newState = getState().manageScores;
      if (
        newState.team2Wickets >= 10 ||
        newState.team2BallsFaced >= maxBalls ||
        newState.team2Total > newState.team1Total
      ) {
        break;
      }
    }

    // Complete second innings
    dispatch({ type: "COMPLETE", payload: "team2" });
  };
};

export default simulateMatch;
