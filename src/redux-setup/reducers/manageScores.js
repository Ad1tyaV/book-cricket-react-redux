const initialState={    
    team1:'',
    team2:'', 
    currentTeamBatting:'',   
    onStrike:{batterIndex:-1},
    offStrike:{batterIndex:0},
    team1Stats:{},
    team2Stats:{},
    innings:0,
    team1Total:0,
    team2Total:0,
    team1Wickets:0,
    team2Wickets:0,
    gameover:false
}

const scoreRunsReducer=(state=initialState,action)=>{
    console.log(action);
    console.log(action.payload?.run);
    switch(action.type){
        case 'SCORE':{
            if(action.payload.run===0){
                console.log(state)
                if(state.currentTeamBatting===state.team1)
                return {
                    ...state,onStrike:{batterIndex:state.onStrike.batterIndex>state.offStrike.batterIndex?state.onStrike.batterIndex+1:state.offStrike.batterIndex+1},team1Wickets:state.onStrike.batterIndex>state.offStrike.batterIndex?state.onStrike.batterIndex+1:state.offStrike.batterIndex+1
                }
                else{
                    return{
                        ...state,onStrike:{batterIndex:state.onStrike.batterIndex>state.offStrike.batterIndex?state.onStrike.batterIndex+1:state.offStrike.batterIndex+1},team2Wickets:state.onStrike.batterIndex>state.offStrike.batterIndex?state.onStrike.batterIndex+1:state.offStrike.batterIndex+1
                    }
                }
            }
            else{

                if(action.payload.run%2){
                    if(state.currentTeamBatting===state.team1){
                        return{
                            ...state,onStrike:{batterIndex:state.offStrike.batterIndex},offStrike:{batterIndex:state.onStrike.batterIndex},team1Total:state.team1Total+action.payload.run,team1Stats:{...state.team1Stats,[state.onStrike.batterIndex]:(state.team1Stats[state.onStrike.batterIndex]??0)+action.payload.run}
                        }
                    }
                    else{
                        return{
                            ...state,onStrike:{batterIndex:state.offStrike.batterIndex},offStrike:{batterIndex:state.onStrike.batterIndex},team2Total:state.team2Total+action.payload.run,team2Stats:{...state.team2Stats,[state.onStrike.batterIndex]:(state.team2Stats[state.onStrike.batterIndex]??0)+action.payload.run}
                        }
                    }
                }
                else{      
                    if(state.currentTeamBatting===state.team1){
                        return{
                            ...state,team1Total:state.team1Total+action.payload.run,team1Stats:{...state.team1Stats,[state.onStrike.batterIndex]:(state.team1Stats[state.onStrike.batterIndex]??0)+action.payload.run}
                        }
                    }
                    else{
                        return {
                        ...state,team2Total:state.team2Total+action.payload.run,team2Stats:{...state.team2Stats,[state.onStrike.batterIndex]:(state.team2Stats[state.onStrike.batterIndex]??0)+action.payload.run}
                       }
                    }
                    
                }

            }
        }
        case 'COMPLETE':{
            console.log(state)
           if(state.currentTeamBatting===state.team1){
               return{
                   ...state,currentTeamBatting:state.team2,onStrike:{batterIndex:-1},offStrike:{batterIndex:0}
               }
           }
           else if(state.currentTeamBatting===state.team2 && state.team2Wickets===10){               
               return{
                   ...state,gameover:true
               }
           }
           else if(state.currentTeamBatting===state.team2 && state.team2Total>state.team1Total){
            return{
                ...state,gameover:true
            }
           }
           else return state;
        }   
        case 'RESET_STATE':
            console.log('here')
            return {    
                team1:'',
                team2:'', 
                currentTeamBatting:'',   
                onStrike:{batterIndex:-1},
                offStrike:{batterIndex:0},
                team1Stats:{},
                team2Stats:{},
                innings:0,
                team1Total:0,
                team2Total:0,
                team1Wickets:0,
                team2Wickets:0,
                gameover:false
            }
        case 'PICK_TEAMS':
            return {
                ...state,team1:action.payload.team1,team2:action.payload.team2,gameover:false,currentTeamBatting:action.payload.team1
            }
        default:
            return state;
    }    
}

export default scoreRunsReducer;