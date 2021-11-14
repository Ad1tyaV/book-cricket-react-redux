import React from 'react'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { PitchTypes } from '../helpers/PitchTypes';
import InputLabel from '@material-ui/core/InputLabel';
import { useState } from 'react'

function PitchType() {

    const [pitch, setPitch] = useState("Random")
    function handlePitchOpener(){

    }

    return (
        <div>           
            <InputLabel shrink id="firstTeam" style={{color:"whitesmoke"}}>
                    Pitch Type
            </InputLabel>   
            <Select label="PitchType" style={{color:"whitesmoke"}}
                labelId="demo-controlled-open-select-label" id="pitchType" value={pitch}
                onOpen={handlePitchOpener}
            >
                {                    
                    PitchTypes.forEach(_pitch=>(                        
                        <MenuItem value="Fake">"Mock"</MenuItem>
                    ))
                }                
            </Select>
        </div>
    )
}

export default PitchType
