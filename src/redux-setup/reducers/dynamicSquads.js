const enableDynamicSquads = true;

const dynamicSquads = (state = enableDynamicSquads, action) => {

    switch(action.type){
        case 'DISABLE':{
            return !state;
        }        

        default:
            return state;
    }

}

export default dynamicSquads;