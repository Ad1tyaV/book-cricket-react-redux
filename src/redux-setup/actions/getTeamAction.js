
const getTeamAction=(TYPE, data)=>{            

    let payload;
    if(TYPE==='SET_TEAM'){             
        payload = data;
    }
    

    return (dispatch)=>{               
        dispatch({type:TYPE, payload : payload})
    }    
}

export default getTeamAction;