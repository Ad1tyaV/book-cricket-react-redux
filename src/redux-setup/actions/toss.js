const toss=(team1,team2)=>{        
    return (dispatch,getState)=>{
        console.log(getState());
        dispatch({type:'SET_FIRST',payload:{TEAM1:team1,TEAM2:team2}})
    }
}