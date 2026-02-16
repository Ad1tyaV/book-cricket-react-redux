import React, { useState } from "react";
import { Button, Select, MenuItem, InputLabel } from "@material-ui/core";

function BilateralSetup({ teams, onStartSeries, onBack }) {
  const [team1, setTeam1] = useState("India");
  const [team2, setTeam2] = useState("NewZealand");
  const [numMatches, setNumMatches] = useState(3);
  const [selectedOvers, setSelectedOvers] = useState(50);
  const [selectedPitch, setSelectedPitch] = useState("Normal");

  const pitchTypes = ["Normal", "Hard", "Wet", "Green", "Dusty"];
  const oversOptions = [
    { value: 20, label: "T20 (20 Overs)", format: "T20" },
    { value: 40, label: "ODI (40 Overs)", format: "ODI_40" },
    { value: 50, label: "ODI (50 Overs)", format: "ODI_50" },
  ];

  const handleStart = () => {
    const selectedFormat = oversOptions.find(opt => opt.value === selectedOvers)?.format || "ODI_50";
    onStartSeries({
      team1,
      team2,
      numMatches,
      overs: selectedOvers,
      format: selectedFormat,
      pitchType: selectedPitch
    });
  };

  return (
    <div style={{ marginLeft: "42%", marginTop: "2%", maxWidth: "300px" }}>
      <h2 style={{ color: "whitesmoke" }}>Bilateral Series Setup</h2>
      
      <InputLabel shrink style={{ color: "whitesmoke" }}>First Team</InputLabel>
      <Select
        value={team1}
        onChange={(e) => setTeam1(e.target.value)}
        style={{ color: "whitesmoke", marginBottom: 20, width: "100%" }}
      >
        {teams.filter(t => t !== team2).map(team => (
          <MenuItem value={team} key={team}>{team}</MenuItem>
        ))}
      </Select>
      <br /><br />

      <InputLabel shrink style={{ color: "whitesmoke" }}>Second Team</InputLabel>
      <Select
        value={team2}
        onChange={(e) => setTeam2(e.target.value)}
        style={{ color: "whitesmoke", marginBottom: 20, width: "100%" }}
      >
        {teams.filter(t => t !== team1).map(team => (
          <MenuItem value={team} key={team}>{team}</MenuItem>
        ))}
      </Select>
      <br /><br />

      <InputLabel shrink style={{ color: "whitesmoke" }}>Number of Matches</InputLabel>
      <Select
        value={numMatches}
        onChange={(e) => setNumMatches(e.target.value)}
        style={{ color: "whitesmoke", marginBottom: 20, width: "100%" }}
      >
        {[3, 5, 7].map(num => (
          <MenuItem value={num} key={num}>{num} Matches</MenuItem>
        ))}
      </Select>
      <br /><br />

      <InputLabel shrink style={{ color: "whitesmoke" }}>Overs</InputLabel>
      <Select
        value={selectedOvers}
        onChange={(e) => setSelectedOvers(e.target.value)}
        style={{ color: "whitesmoke", marginBottom: 20, width: "100%" }}
      >
        {oversOptions.map(option => (
          <MenuItem value={option.value} key={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <br /><br />

      <InputLabel shrink style={{ color: "whitesmoke" }}>Pitch Type</InputLabel>
      <Select
        value={selectedPitch}
        onChange={(e) => setSelectedPitch(e.target.value)}
        style={{ color: "whitesmoke", marginBottom: 20, width: "100%" }}
      >
        {pitchTypes.map(pitch => (
          <MenuItem value={pitch} key={pitch}>{pitch}</MenuItem>
        ))}
      </Select>
      <br /><br />

      <Button variant="contained" color="primary" onClick={handleStart} style={{ marginRight: 10 }}>
        Start Series
      </Button>
      <Button variant="outlined" style={{ color: "whitesmoke" }} onClick={onBack}>
        Back
      </Button>
    </div>
  );
}

export default BilateralSetup;
