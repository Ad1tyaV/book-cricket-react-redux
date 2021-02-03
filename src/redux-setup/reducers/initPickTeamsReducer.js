const initialState={}
const initPickTeams=(state=initialState,action)=>{
    //console.log(action);
    switch(action.type){
        case 'PICK_TEAMS':{
            return {...initialState,team1:action.payload.team1Name,team2:action.payload.team2Name,team1Stats:action.payload.team1Squad,team2Stats:action.payload.team2Squad};
        }
        default:
            return state;
    }
}

export default initPickTeams;