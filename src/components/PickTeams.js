import React,{useState, useRef} from 'react'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { connect } from 'react-redux';
import pickTeams from '../redux-setup/actions/pickTeams';
import { Button } from '@material-ui/core';
import TestComponent from './TestComponent'
import {SwapVert} from '@material-ui/icons';

function PickTeams(props) {
    const [openTeam1, setOpenTeam1] = useState(false);
    const [openTeam2, setOpenTeam2] = useState(false);
    const [firstTeam, setFirstTeam] = useState("India")
    const [secondTeam,setSecondTeam] = useState("Pakistan")
    const teams = useRef(["India","Pakistan","Australia","England","SouthAfrica","NewZealand"])
    const handleChangeFirstTeam=(event)=>{
        setFirstTeam(event.target.value)
    };

    const handleChangeSecondTeam=(event)=>{
        setSecondTeam(event.target.value);
    };

    const handleClose = () => {
        setOpenTeam1(false);
    };
    
      const handleOpen = () => {
        setOpenTeam1(true);
    };

    const handleClose2 = () => {
        setOpenTeam2(false);
    };
    
      const handleOpen2 = () => {
        setOpenTeam2(true);
    };


    return (
        <div>
            {
                props.scoreData.team1===''?
                <>
                    <div style={{marginLeft:'47.5%',marginTop:'1%'}}>
                    <InputLabel shrink id="firstTeam" style={{color:"whitesmoke"}}>
                    First Team
                    </InputLabel>    
                    <Select label="First Team"
                    labelId="demo-controlled-open-select-label" id="firstTeam" open={openTeam1} onClose={handleClose} onOpen={handleOpen} value={firstTeam} onChange={handleChangeFirstTeam} style={{color:"whitesmoke"}}>
                    {
                        teams.current.map((team)=>(
                            team!==secondTeam?<MenuItem value={team}>{team}</MenuItem>:[]
                        ))
                    }
                    </Select>
                    <br/>
                    &nbsp;&nbsp;&nbsp;<SwapVert htmlColor="white" onClick={()=>{setFirstTeam(secondTeam); setSecondTeam(firstTeam)}}/>
                    <br/>
                    <InputLabel shrink id="secondTeam" style={{color:"whitesmoke"}}>
                    Second Team
                    </InputLabel>    
                    <Select
                    labelId="demo-controlled-open-select-label" id="secondTeam" open={openTeam2} onClose={handleClose2} onOpen={handleOpen2} value={secondTeam} onChange={handleChangeSecondTeam} style={{color:"whitesmoke"}}>
                    {
                        teams.current.map((team)=>(
                            team!==firstTeam?<MenuItem value={team}>{team}</MenuItem>:[]
                        ))   
                    }
                    </Select>
                    <br/>
                    <br/>
                    <Button variant="contained" color="primary" onClick={()=>{props.pickTeamDispatch(firstTeam,secondTeam)}}>PLAY</Button>
                    </div>
                    </>
                    :<TestComponent/>  
                }          
            
        </div>
    )
}


const mapStateToProps=(state)=>{
    return{
        scoreData:state.manageScores
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        pickTeamDispatch:(team1,team2)=>dispatch(pickTeams(team1,team2))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PickTeams)
