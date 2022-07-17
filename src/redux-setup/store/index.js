import thunk from "redux-thunk";
import { applyMiddleware } from "redux";
import { combineReducers } from "redux";
import manageScores from "../reducers/manageScores";
import initPickTeams from "../reducers/initPickTeamsReducer";
import setFirstTeams from "../reducers/setFirstTeamsReducer";
import getTeams from "../reducers/teamsReducer";
import { createStore } from "redux";
import dynamicSquads from "../reducers/dynamicSquads";

const rootReducer = combineReducers({
  manageScores,
  initPickTeams,
  setFirstTeams,
  getTeams,
  dynamicSquads,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
