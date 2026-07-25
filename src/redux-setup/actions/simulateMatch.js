const simulateMatch = (pitchType) => {
  return (dispatch, getState) => {
    const maxBalls = getState().manageScores.overs * 6;
    dispatch({
      type: "SCORE_MANY",
      payload: { deliveries: maxBalls, pitchType },
    });
    dispatch({ type: "COMPLETE" });

    if (getState().manageScores.gameover) return;

    dispatch({
      type: "SCORE_MANY",
      payload: { deliveries: maxBalls, pitchType },
    });
    dispatch({ type: "COMPLETE" });
  };
};

export default simulateMatch;
