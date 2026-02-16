import React, { useState } from "react";
import { Button, Select, MenuItem, InputLabel, Radio, RadioGroup, FormControlLabel, FormControl } from "@material-ui/core";

function MatchSetup({ match, onStartMatch }) {
  const [selectedPitch, setSelectedPitch] = useState("Normal");
  const [tossWinner, setTossWinner] = useState(match.team1);
  const [tossDecision, setTossDecision] = useState("bat");

  const pitchTypes = ["Normal", "Hard", "Wet", "Green", "Dusty"];

  const handleStart = () => {
    const battingFirst = tossDecision === "bat" ? tossWinner : 
                         (tossWinner === match.team1 ? match.team2 : match.team1);
    
    onStartMatch({
      pitchType: selectedPitch,
      battingFirst
    });
  };

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center",
      minHeight: "50vh",
      color: "whitesmoke",
      padding: 20
    }}>
      <h2>{match.stage}</h2>
      <h3>{match.team1} vs {match.team2}</h3>
      
      <div style={{ marginTop: 30, minWidth: 300 }}>
        <InputLabel shrink style={{ color: "whitesmoke", marginBottom: 10 }}>
          Pitch Type
        </InputLabel>
        <Select
          value={selectedPitch}
          onChange={(e) => setSelectedPitch(e.target.value)}
          style={{ color: "whitesmoke", width: "100%", marginBottom: 30 }}
        >
          {pitchTypes.map(pitch => (
            <MenuItem value={pitch} key={pitch}>{pitch}</MenuItem>
          ))}
        </Select>

        <FormControl component="fieldset" style={{ marginBottom: 20 }}>
          <InputLabel shrink style={{ color: "whitesmoke", marginBottom: 10 }}>
            Toss Winner
          </InputLabel>
          <RadioGroup value={tossWinner} onChange={(e) => setTossWinner(e.target.value)}>
            <FormControlLabel 
              value={match.team1} 
              control={<Radio style={{ color: "whitesmoke" }} />} 
              label={<span style={{ color: "whitesmoke" }}>{match.team1}</span>}
            />
            <FormControlLabel 
              value={match.team2} 
              control={<Radio style={{ color: "whitesmoke" }} />} 
              label={<span style={{ color: "whitesmoke" }}>{match.team2}</span>}
            />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" style={{ marginBottom: 30 }}>
          <InputLabel shrink style={{ color: "whitesmoke", marginBottom: 10 }}>
            Toss Decision
          </InputLabel>
          <RadioGroup value={tossDecision} onChange={(e) => setTossDecision(e.target.value)}>
            <FormControlLabel 
              value="bat" 
              control={<Radio style={{ color: "whitesmoke" }} />} 
              label={<span style={{ color: "whitesmoke" }}>Bat First</span>}
            />
            <FormControlLabel 
              value="bowl" 
              control={<Radio style={{ color: "whitesmoke" }} />} 
              label={<span style={{ color: "whitesmoke" }}>Bowl First</span>}
            />
          </RadioGroup>
        </FormControl>

        <Button variant="contained" color="primary" onClick={handleStart} fullWidth>
          Start Match
        </Button>
      </div>
    </div>
  );
}

export default MatchSetup;
