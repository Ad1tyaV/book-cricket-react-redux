const initialState={}
const setFirstTeams=(state=initialState,action)=>{
    switch(action.type){
        case 'SET_FIRST':{
            if(state.team1!==action.payload.TEAM1)
                return {...initialState,
                    team1:state.team2,team2:state.team1,currentTeamBatting:state.team2,team1Stats:state.team2Stats,team2Stats:state.team1Stats,innings:1
                } 
            else
                return state;               
        }
        default:
            return state;
    }

}

export default setFirstTeams;