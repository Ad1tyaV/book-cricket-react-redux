import React, { useState } from 'react';
import { Button, Typography, Paper, Grid } from '@material-ui/core';
import { getImprovedRandomOutcome, PLAYER_ARCHETYPES, FORMAT_MODIFIERS } from '../helpers/improvedRandomNumber';

const FormatDemo = () => {
  const [results, setResults] = useState({});
  
  const runSimulation = (format, archetype, balls = 60) => {
    const outcomes = { '-1': 0, '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '6': 0 };
    let totalRuns = 0;
    
    for (let i = 0; i < balls; i++) {
      const gameState = {
        ballsFaced: i,
        currentScore: totalRuns,
        targetScore: null,
        wicketsLost: 0,
        batterIndex: 0
      };
      
      const outcome = getImprovedRandomOutcome(archetype, format, 'NORMAL', gameState);
      outcomes[outcome.toString()]++;
      if (outcome > 0) totalRuns += outcome;
    }
    
    return { outcomes, totalRuns, strikeRate: (totalRuns / balls * 6).toFixed(2) };
  };
  
  const handleSimulation = () => {
    const formats = ['T20', 'ODI_40', 'ODI_50'];
    const archetypes = ['AGGRESSIVE', 'ANCHOR', 'POWER_HITTER'];
    const newResults = {};
    
    formats.forEach(format => {
      newResults[format] = {};
      archetypes.forEach(archetype => {
        newResults[format][archetype] = runSimulation(format, archetype);
      });
    });
    
    setResults(newResults);
  };
  
  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <Typography variant="h4" gutterBottom>
        Cricket Format Simulation Demo
      </Typography>
      
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSimulation}
        style={{ marginBottom: '20px' }}
      >
        Run 60-Ball Simulation
      </Button>
      
      {Object.keys(results).length > 0 && (
        <Grid container spacing={3}>
          {Object.entries(results).map(([format, formatData]) => (
            <Grid item xs={12} key={format}>
              <Paper style={{ padding: '15px', backgroundColor: '#333', color: 'white' }}>
                <Typography variant="h5" gutterBottom>
                  {FORMAT_MODIFIERS[format]?.name || format}
                </Typography>
                
                <Grid container spacing={2}>
                  {Object.entries(formatData).map(([archetype, data]) => (
                    <Grid item xs={4} key={archetype}>
                      <Paper style={{ padding: '10px', backgroundColor: '#444', color: 'white' }}>
                        <Typography variant="h6">
                          {PLAYER_ARCHETYPES[archetype]?.name}
                        </Typography>
                        <Typography variant="body2" style={{ marginBottom: '10px' }}>
                          {PLAYER_ARCHETYPES[archetype]?.description}
                        </Typography>
                        
                        <Typography variant="body1">
                          <strong>Total Runs:</strong> {data.totalRuns}
                        </Typography>
                        <Typography variant="body1">
                          <strong>Strike Rate:</strong> {data.strikeRate}
                        </Typography>
                        
                        <Typography variant="body2" style={{ marginTop: '10px' }}>
                          <strong>Ball-by-ball breakdown:</strong>
                        </Typography>
                        <div style={{ fontSize: '12px' }}>
                          Wickets: {data.outcomes['-1']}, 
                          Dots: {data.outcomes['0']}, 
                          1s: {data.outcomes['1']}, 
                          2s: {data.outcomes['2']}, 
                          4s: {data.outcomes['4']}, 
                          6s: {data.outcomes['6']}
                        </div>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
      
      <Paper style={{ padding: '15px', backgroundColor: '#333', color: 'white', marginTop: '20px' }}>
        <Typography variant="h6">Key Improvements Over Original System:</Typography>
        <ul>
          <li><strong>Format Awareness:</strong> T20 players are more aggressive, ODI players more balanced</li>
          <li><strong>Dynamic Player Types:</strong> Instead of fixed player stats, uses archetypes that adapt</li>
          <li><strong>Game Situation:</strong> Considers balls faced, target score, wickets in hand</li>
          <li><strong>Scalable:</strong> Easy to add new formats (Test, T10, etc.) or player types</li>
          <li><strong>Realistic:</strong> Strike rates and scoring patterns match real cricket</li>
        </ul>
      </Paper>
    </div>
  );
};

export default FormatDemo;