import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import pickTeams from "../redux-setup/actions/pickTeams";
import resetState from "../redux-setup/actions/resetState";
import MatchComponent from "./MatchComponent";
import MatchSetup from "./MatchSetup";
import { Button } from "@material-ui/core";
import { getMatchResult } from "../helpers/matchResultHelper";

function BilateralManager({ config, onExit, scoreData, pickTeamDispatch, resetDispatch }) {
  const [currentMatch, setCurrentMatch] = useState(1);
  const [seriesScore, setSeriesScore] = useState({ team1: 0, team2: 0 });
  const [matchResults, setMatchResults] = useState([]);
  const [matchSetupPending, setMatchSetupPending] = useState(true);
  const [currentPitchType, setCurrentPitchType] = useState("Normal");

  useEffect(() => {
    // Don't auto-start, wait for match setup
  }, []);

  useEffect(() => {
    if (scoreData.gameover && currentMatch <= config.numMatches && !matchSetupPending) {
      // Update series score
      const team1Won = scoreData.team1Total > scoreData.team2Total;
      const team2Won = scoreData.team2Total > scoreData.team1Total;
      
      const newSeriesScore = {
        team1: seriesScore.team1 + (team1Won ? 1 : 0),
        team2: seriesScore.team2 + (team2Won ? 1 : 0)
      };
      
      setSeriesScore(newSeriesScore);
      
      // Record match result
      const result = {
        matchNum: currentMatch,
        team1Score: `${scoreData.team1Total}/${scoreData.team1Wickets}`,
        team2Score: `${scoreData.team2Total}/${scoreData.team2Wickets}`,
        winner: team1Won ? scoreData.team1 : (team2Won ? scoreData.team2 : "Tie"),
        result: getMatchResult(scoreData)
      };
      setMatchResults([...matchResults, result]);
    }
  }, [scoreData.gameover]);

  const handleMatchStart = (matchConfig) => {
    const { pitchType, battingFirst } = matchConfig;
    
    // Determine team order based on toss
    const team1 = battingFirst;
    const team2 = battingFirst === config.team1 ? config.team2 : config.team1;
    
    setCurrentPitchType(pitchType);
    pickTeamDispatch(team1, team2, config.overs, config.format);
    setMatchSetupPending(false);
  };

  const handleNextMatch = () => {
    if (currentMatch < config.numMatches) {
      setCurrentMatch(currentMatch + 1);
      setMatchSetupPending(true);
      resetDispatch();
    }
  };

  const isSeriesComplete = currentMatch === config.numMatches && scoreData.gameover;
  const seriesWinner = seriesScore.team1 > seriesScore.team2 ? config.team1 : 
                       seriesScore.team2 > seriesScore.team1 ? config.team2 : "Series Tied";

  // Show match setup
  if (matchSetupPending) {
    return (
      <div>
        <div style={{ textAlign: "center", padding: 10, color: "whitesmoke", backgroundColor: "#333" }}>
          <h3>Match {currentMatch} of {config.numMatches}</h3>
          <p>Series Score: {config.team1} {seriesScore.team1} - {seriesScore.team2} {config.team2}</p>
        </div>
        <MatchSetup 
          match={{ team1: config.team1, team2: config.team2, stage: `Match ${currentMatch}` }}
          onStartMatch={handleMatchStart}
        />
      </div>
    );
  }

  return (
    <div>
      <div style={{ textAlign: "center", padding: 10, color: "whitesmoke", backgroundColor: "#333" }}>
        <h3>Match {currentMatch} of {config.numMatches}</h3>
        <p>Series Score: {config.team1} {seriesScore.team1} - {seriesScore.team2} {config.team2}</p>
      </div>
      
      {scoreData.team1 && (
        <MatchComponent pitchType={currentPitchType} />
      )}
      
      {scoreData.gameover && (
        <div style={{ textAlign: "center", marginTop: 20, color: "whitesmoke" }}>
          {!isSeriesComplete ? (
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleNextMatch}
              style={{ marginRight: 10 }}
            >
              Next Match
            </Button>
          ) : (
            <div>
              <h2>Series Complete!</h2>
              <h3>{seriesWinner} wins the series {seriesScore.team1}-{seriesScore.team2}</h3>
              <div style={{ marginTop: 20 }}>
                <h4>Match Results:</h4>
                {matchResults.map((result, index) => (
                  <p key={index}>
                    Match {result.matchNum}: {result.result}
                  </p>
                ))}
              </div>
            </div>
          )}
          <Button variant="outlined" style={{ color: "whitesmoke", marginTop: 10 }} onClick={onExit}>
            Exit Series
          </Button>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  scoreData: state.manageScores
});

const mapDispatchToProps = (dispatch) => ({
  pickTeamDispatch: (team1, team2, overs, format) => dispatch(pickTeams(team1, team2, overs, format)),
  resetDispatch: () => dispatch(resetState())
});

export default connect(mapStateToProps, mapDispatchToProps)(BilateralManager);
