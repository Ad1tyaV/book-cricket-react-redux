import RandomWithIndex from '../../helpers/randomNumber';

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
    gameover:false,
    team1BallsFaced:0,
    team2BallsFaced:0,
}

const scoreRunsReducer=(state=initialState,action)=>{
    //console.log(action);
    //console.log(action.payload?.run);
    switch(action.type){
        case 'SCORE':{   
            if(state.gameover) return state;
            let updatedRun = RandomWithIndex(state.onStrike.batterIndex);
            //console.log(updatedRun);
            
            if(updatedRun===-1){
                
                if(state.currentTeamBatting===state.team1 && state.team1Wickets!==10){
                    return {
                        ...state,offStrike:{...state.offStrike,batterIndex:state.onStrike.batterIndex},onStrike:{...state.onStrike,batterIndex:state.onStrike.batterIndex>state.offStrike.batterIndex?state.onStrike.batterIndex+1:state.offStrike.batterIndex+1},team1Wickets:state.onStrike.batterIndex>state.offStrike.batterIndex?state.onStrike.batterIndex+1:state.offStrike.batterIndex+1,team1BallsFaced:state.team1BallsFaced+1
                    }
                }
                else if(state.currentTeamBatting===state.team2 && state.team2Wickets!==10){
                    return{
                        ...state,offStrike:{...state.offStrike,batterIndex:state.onStrike.batterIndex},onStrike:{...state.onStrike,batterIndex:state.onStrike.batterIndex>state.offStrike.batterIndex?state.onStrike.batterIndex+1:state.offStrike.batterIndex+1},team2Wickets:state.onStrike.batterIndex>state.offStrike.batterIndex?state.onStrike.batterIndex+1:state.offStrike.batterIndex+1,team2BallsFaced:state.team2BallsFaced+1
                    }
                }
                else return state;
            }
            else{

                if(updatedRun%2){
                    if(state.currentTeamBatting===state.team1 && state.team1Wickets!==10){
                        return {
                            ...state,team1Total:state.team1Total+updatedRun,team1Stats:{...state.team1Stats,[state.onStrike.batterIndex]:(state.team1Stats[state.onStrike.batterIndex]??0)+updatedRun},team1BallsFaced:state.team1BallsFaced+1,onStrike:{...state.onStrike,batterIndex:state.offStrike.batterIndex},offStrike:{...state.offStrike,batterIndex:state.onStrike.batterIndex}
                        }
                        
                    }
                    else if(state.currentTeamBatting===state.team2 && state.team2Wickets!==10 && state.team2Total<=state.team1Total){
                        return{
                            ...state,team2Total:state.team2Total+updatedRun,team2Stats:{...state.team2Stats,[state.onStrike.batterIndex]:(state.team2Stats[state.onStrike.batterIndex]??0)+updatedRun},team2BallsFaced:state.team2BallsFaced+1,onStrike:{...state.onStrike,batterIndex:state.offStrike.batterIndex},offStrike:{...state.offStrike,batterIndex:state.onStrike.batterIndex}
                        }                        
                    }
                    else return state;
                }
                else{      
                    if(state.currentTeamBatting===state.team1 && state.team1Wickets!==10){
                        return{
                            ...state,team1Total:state.team1Total+updatedRun,team1Stats:{...state.team1Stats,[state.onStrike.batterIndex]:(state.team1Stats[state.onStrike.batterIndex]??0)+updatedRun},team1BallsFaced:state.team1BallsFaced+1
                        }
                    }
                    else if(state.currentTeamBatting===state.team2 && state.team2Wickets!==10 && state.team2Total<=state.team1Total){
                        return {
                            ...state,team2Total:state.team2Total+updatedRun,team2Stats:{...state.team2Stats,[state.onStrike.batterIndex]:(state.team2Stats[state.onStrike.batterIndex]??0)+updatedRun},team2BallsFaced:state.team2BallsFaced+1
                       }
                    }
                    else return state;
                    
                }

            }            
        }
        case 'COMPLETE':{            
           if(state.currentTeamBatting===state.team1){
               return{
                   ...state,currentTeamBatting:state.team2,onStrike:{batterIndex:-1},offStrike:{batterIndex:0}
               }
           }
           else if(state.currentTeamBatting===state.team2 && (state.team2Wickets===10 || state.team2BallsFaced===300)){               
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
            //console.log('here')
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
                ...state,team1:action.payload.team1,team2:action.payload.team2,gameover:false,currentTeamBatting:action.payload.team1,team1BallsFaced:0,team2BallsFaced:0
            }
        default:
            return state;
    }    
}

export default scoreRunsReducer;