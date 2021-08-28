import React,{useEffect, useState, useRef} from 'react'
import { connect } from 'react-redux';
import scoreX from '../redux-setup/actions/scoreX'
import completeInnings from '../redux-setup/actions/completeInnings'
import resetState from '../redux-setup/actions/resetState'
import ScoreCard from './ScoreCard';
import { Button } from '@material-ui/core';

function TestComponent(props) {

    const [message, setMessage] = useState("")
    const track = useRef({})
    // useEffect(() => {
    //     props.pickTeamDispatch();        
    // }, [])
    
     useEffect(()=>{  

         //console.log('inside useEffect')
         if(!props.scoreData.gameover){
            if(props.scoreData.team1Wickets===10 || props.scoreData.team1BallsFaced===300){                        
                if(Object.keys(track.current).length===0) {
                    track.current={}
                    track.current = {...track.current,team1:{...track.current.team1,player_1:props.scoreData.onStrike.batterIndex,player_2:props.scoreData.offStrike.batterIndex}}                
                }
                props.completeInningsDispatch('team1');
            }
        }
        if(props.scoreData.team1Wickets===10 || props.scoreData.team1BallsFaced===300){
            if(props.scoreData.team2Total>props.scoreData.team1Total){   
                track.current = {...track.current,team2:{...track.current.team1,player_1:props.scoreData.onStrike.batterIndex,player_2:props.scoreData.offStrike.batterIndex}}
                setMessage(`${props.scoreData.team2} won by ${10-props.scoreData.team2Wickets} wickets`)
            }
            else if(props.scoreData.team2Total===props.scoreData.team1Total && (props.scoreData.team2Wickets===10 || props.scoreData.team2BallsFaced===300)){
                track.current = {...track.current,team2:{...track.current.team1,player_1:props.scoreData.onStrike.batterIndex,player_2:props.scoreData.offStrike.batterIndex}}
                setMessage(`Match Tied`)
            }
            else if(props.scoreData.team2Total<props.scoreData.team1Total && (props.scoreData.team2Wickets===10 || props.scoreData.team2BallsFaced===300)){
                track.current = {...track.current,team2:{...track.current.team1,player_1:props.scoreData.onStrike.batterIndex,player_2:props.scoreData.offStrike.batterIndex}}
                setMessage(`${props.scoreData.team1} beat ${props.scoreData.team2} by ${props.scoreData.team1Total-props.scoreData.team2Total} runs`)
            }
        }

     },[props.scoreData])

    return (
        <div style={{color:"whitesmoke"}}>            
            {   
                <>
                <span className='score_data' style={{display:'flex',justifyContent:'center'}}>
                    <h3>{props.scoreData.team1}</h3>&nbsp;&nbsp;
                    <h3>{props.scoreData.team1Total}/{props.scoreData.team1Wickets} Overs:{Math.floor(props.scoreData.team1BallsFaced/6)}.{props.scoreData.team1BallsFaced%6} RR:{(props.scoreData.team1Total/((props.scoreData.team1BallsFaced||1)/6)).toPrecision(3)??0}</h3>
                </span>
                
                <span className='score_data' style={{display:'flex',justifyContent:'center'}}>
                    <h3>{props.scoreData.team2}</h3>&nbsp;&nbsp;
                    <h3>{props.scoreData.team2Total}/{props.scoreData.team2Wickets} Overs:{Math.floor(props.scoreData.team2BallsFaced/6)}.{props.scoreData.team2BallsFaced%6} RR:{(props.scoreData.team2Total/((props.scoreData.team2BallsFaced||1)/6)).toPrecision(3)??0}</h3>                
                </span>
                </>
            }
            {<br/>}
            {
                    (props.scoreData.currentTeamBatting===props.scoreData.team1)?<div><span style={{display:'flex',justifyContent:'center'}}>{props.teamData[props.scoreData.team1][props.scoreData.onStrike.batterIndex]}👉🏾{props.scoreData.team1Stats[props.scoreData.onStrike.batterIndex]??0}</span><br/><span style={{display:'flex',justifyContent:'center'}}>{props.teamData[props.scoreData.team1][props.scoreData.offStrike.batterIndex]}👉🏾{props.scoreData.team1Stats[props.scoreData.offStrike.batterIndex]??0}</span></div>:<div><span style={{display:'flex',justifyContent:'center'}}>{props.teamData[props.scoreData.team2][props.scoreData.onStrike.batterIndex]}👉🏾{props.scoreData.team2Stats[props.scoreData.onStrike.batterIndex]??0}</span><br/><span style={{display:'flex',justifyContent:'center'}}>{props.teamData[props.scoreData.team2][props.scoreData.offStrike.batterIndex]}👉🏾{props.scoreData.team2Stats[props.scoreData.offStrike.batterIndex]??0}</span></div>
            }
            {<hr/>}
            {   
            
                props.scoreData.gameover?<><span style={{display:'flex',justifyContent:'center',fontWeight:'600'}}>{message}</span><br/><span style={{display:'flex',justifyContent:'center'}}><Button variant="contained" color="primary" onClick={()=>{track.current={};props.resetDispatch()}}>Play Again</Button></span></>:<span style={{display:'flex',justifyContent:'center'}}><Button color="primary" variant="contained" onClick={()=>{for(let i=0;i<6;i++)props.scoreDispatch((Math.floor(Math.random()*7)))}}>PLAY</Button></span>                
            }

            {props.scoreData.gameover?<ScoreCard track={track.current} team1={props.scoreData.team1} team2={props.scoreData.team2} teamData={props.teamData} team1Stats={props.scoreData.team1Stats} team2Stats={props.scoreData.team2Stats}/>:<></>}
                                      
        </div>
    )
}

const mapStateToProps=(state)=>{
    //console.log(state);
    return{
        scoreData:state.manageScores,
        teamData:state.getTeams
    }

}

const mapDispatchToProps=(dispatch)=>{

    return{
        scoreDispatch:(X)=>dispatch(scoreX(null,X)),
        completeInningsDispatch:(team)=>dispatch(completeInnings(team)),
        resetDispatch:()=>dispatch(resetState()),
        //pickTeamDispatch:()=>dispatch(pickTeams("India","Pakistan")),        
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(TestComponent)
