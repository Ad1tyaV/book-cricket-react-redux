import { getDefaultXI } from "../../helpers/teamHelpers";

const pickTeams = (
  team1,
  team2,
  overs = 50,
  format = "ODI_50",
  team1PlayingXI,
  team2PlayingXI
) => {
  return (dispatch, getState) => {
    const teamData = getState().getTeams;
    dispatch({
      type: "PICK_TEAMS",
      payload: {
        team1,
        team2,
        overs,
        format,
        team1PlayingXI:
          team1PlayingXI?.length === 11
            ? team1PlayingXI
            : getDefaultXI(teamData, team1, format),
        team2PlayingXI:
          team2PlayingXI?.length === 11
            ? team2PlayingXI
            : getDefaultXI(teamData, team2, format),
      },
    });
  };
};

export default pickTeams;
