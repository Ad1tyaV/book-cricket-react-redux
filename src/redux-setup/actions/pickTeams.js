const pickTeams = (team1, team2) => {
  return (dispatch) => {
    dispatch({ type: "PICK_TEAMS", payload: { team1: team1, team2: team2 } });
  };
};

export default pickTeams;
