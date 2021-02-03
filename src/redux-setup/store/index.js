import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux'
import { combineReducers } from 'redux'
import manageScores from '../reducers/manageScores'
import initPickTeams from '../reducers/initPickTeamsReducer'
import setFirstTeams from '../reducers/setFirstTeamsReducer'
import getTeams from '../reducers/teamsReducer'
import { createStore } from 'redux';

const rootReducer=combineReducers({

    manageScores:manageScores,
    initPickTeams:initPickTeams,
    setFirstTeams:setFirstTeams,
    getTeams:getTeams

})
const store=createStore(rootReducer,applyMiddleware(thunk))

export default store;