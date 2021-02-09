import React from 'react'
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';


function ScoreCard(props) {
    const ppl=[-1,0,1,2,3,4,5,6,7,8,9,10];
    return (
        <div>
            
            <Table style={{maxWidth: 500,maxHeight:100,float:'left'}} aria-label="customized table" key={Date.now()}>
                <TableBody>
                    {/* <tr>{Object.keys(props.teamData["India"]).map((key)=>[props.teamData["India"][key],props.team1Stats[key]??0])}</tr> */}
                    {
                        ppl.map((index)=>{return <><TableRow><TableCell>{props.teamData[props.team1][index]}</TableCell><TableCell>{props.team1Stats[index]??0}</TableCell></TableRow></>})                          
                    }                    
                </TableBody>
            </Table>             
            
            <Table style={{maxWidth: 500,maxHeight:100,float:'right'}} aria-label="customized table" key={Date.now()}>
                <TableBody>                    
                    {
                        ppl.map((index)=>{return <><TableRow><TableCell>{props.teamData[props.team2][index]}</TableCell><TableCell>{props.team2Stats[index]??0}</TableCell></TableRow></>})                          
                    }                    
                </TableBody>
            </Table>             

        </div>
    )
}

export default ScoreCard
