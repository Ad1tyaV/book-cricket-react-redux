const pickTeams = (team1, team2, overs = 50, format = "ODI_50") => {
  return (dispatch) => {
    dispatch({ type: "PICK_TEAMS", payload: { team1: team1, team2: team2, overs: overs, format: format } });
  };
};

export default pickTeams;
