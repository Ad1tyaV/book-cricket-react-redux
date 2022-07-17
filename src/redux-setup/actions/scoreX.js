const scoreX = (team, pitch) => {
  return (dispatch, getState) => {
    dispatch({ type: "SCORE", payload: { pitchType: pitch } });
  };
};
export default scoreX;
