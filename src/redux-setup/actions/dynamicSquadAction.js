
const dynamicSquadAction=(TYPE)=>{

    return (dispatch)=>{               
        dispatch({type:TYPE})
    }    

}

export default dynamicSquadAction;