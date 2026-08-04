import squadCatalog from "../../data/cric-vfinal.json";

const initialState = squadCatalog;

const getTeams = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TEAM":
    case "SET_TEAM_CATALOG":
      return action.payload;
    case "GET_TEAM":
      return state;
    default:
      return state;
  }
};

export default getTeams;
