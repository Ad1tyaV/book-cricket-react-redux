export const changePlayer = (currentPlayerPosition) => {
  return (dispatch, getState) => {
    //console.log(getState())
    dispatch({ type: "NEXT_PLAYER", payload: currentPlayerPosition });
  };
};
