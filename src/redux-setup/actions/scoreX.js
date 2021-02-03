const scoreX=(player,X)=>{
    return (dispatch,getState)=>{
        //console.log(getState());
        
        dispatch({type:'SCORE',payload:{run:X===5?1:X}})
    }
}
export default scoreX;