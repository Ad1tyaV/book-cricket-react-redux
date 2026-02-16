import React, { useState } from "react";
import { Button, Select, MenuItem, InputLabel, Checkbox, FormControlLabel } from "@material-ui/core";

function TournamentSetup({ teams, onStartTournament, onBack }) {
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [selectedOvers, setSelectedOvers] = useState(50);
  const allTeamsSelected = selectedTeams.length === teams.length;

  const oversOptions = [
    { value: 20, label: "T20 (20 Overs)", format: "T20" },
    { value: 40, label: "ODI (40 Overs)", format: "ODI_40" },
    { value: 50, label: "ODI (50 Overs)", format: "ODI_50" },
  ];

  const handleTeamToggle = (team) => {
    if (selectedTeams.includes(team)) {
      setSelectedTeams(selectedTeams.filter(t => t !== team));
    } else {
      setSelectedTeams([...selectedTeams, team]);
    }
  };

  const handleSelectAllTeams = () => {
    setSelectedTeams(allTeamsSelected ? [] : [...teams]);
  };

  const handleStart = () => {
    if (selectedTeams.length < 4) {
      alert("Please select at least 4 teams for the tournament");
      return;
    }
    const selectedFormat = oversOptions.find(opt => opt.value === selectedOvers)?.format || "ODI_50";
    onStartTournament({
      teams: selectedTeams,
      overs: selectedOvers,
      format: selectedFormat
    });
  };

  return (
    <div style={{ marginLeft: "35%", marginTop: "2%", maxWidth: "400px" }}>
      <h2 style={{ color: "whitesmoke" }}>Tournament Setup</h2>
      
      <div style={{ marginBottom: 20 }}>
        <InputLabel style={{ color: "whitesmoke", marginBottom: 10 }}>
          Select Teams (min 4)
        </InputLabel>
        <p style={{ color: "#bbb", margin: "0 0 8px 0" }}>
          Selected: {selectedTeams.length}/{teams.length}
        </p>
        <FormControlLabel
          control={
            <Checkbox
              checked={allTeamsSelected}
              onChange={handleSelectAllTeams}
              style={{ color: "whitesmoke" }}
            />
          }
          label={
            <span style={{ color: "whitesmoke" }}>
              {allTeamsSelected ? "Unselect All Teams" : "Select All Teams"}
            </span>
          }
          style={{ display: "block", marginBottom: 8 }}
        />
        {teams.map(team => (
          <FormControlLabel
            key={team}
            control={
              <Checkbox
                checked={selectedTeams.includes(team)}
                onChange={() => handleTeamToggle(team)}
                style={{ color: "whitesmoke" }}
              />
            }
            label={<span style={{ color: "whitesmoke" }}>{team}</span>}
            style={{ display: "block" }}
          />
        ))}
      </div>

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

      <Button variant="contained" color="primary" onClick={handleStart} style={{ marginRight: 10 }}>
        Start Tournament
      </Button>
      <Button variant="outlined" style={{ color: "whitesmoke" }} onClick={onBack}>
        Back
      </Button>
    </div>
  );
}

export default TournamentSetup;
