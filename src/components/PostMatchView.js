import React, { useState } from "react";
import { Tabs, Tab, Button } from "@material-ui/core";
import TournamentStandings from "./TournamentStandings";
import StatsTab from "./StatsTab";
import SingleTeamScoreCard from "./SingleTeamScoreCard";
import { getMatchResult } from "../helpers/matchResultHelper";

function PostMatchView({ 
  standings, 
  playerStats, 
  currentStage,
  scoreData,
  teamData,
  track,
  onNextMatch,
  onExit,
  showNextButton,
  nextButtonText,
  resultOverride
}) {
  const [activeTab, setActiveTab] = useState(0);
  const matchResult = resultOverride || getMatchResult(scoreData);

  return (
    <div>
      {/* Match Result Banner */}
      <div style={{ 
        textAlign: "center", 
        padding: 20, 
        backgroundColor: "#2a2a2a",
        borderBottom: "3px solid #4CAF50"
      }}>
        <h2 style={{ color: "#4CAF50", margin: 0 }}>{matchResult}</h2>
        <p style={{ color: "#aaa", margin: "10px 0 0 0" }}>
          {scoreData.team1}: {scoreData.team1Total}/{scoreData.team1Wickets} | {" "}
          {scoreData.team2}: {scoreData.team2Total}/{scoreData.team2Wickets}
        </p>
      </div>

      <Tabs 
        value={activeTab} 
        onChange={(e, val) => setActiveTab(val)} 
        style={{ backgroundColor: "#333" }}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label={`${scoreData.team1} Scorecard`} style={{ color: "whitesmoke" }} />
        <Tab label={`${scoreData.team2} Scorecard`} style={{ color: "whitesmoke" }} />
        <Tab label="Standings" style={{ color: "whitesmoke" }} />
        <Tab label="Stats" style={{ color: "whitesmoke" }} />
      </Tabs>

      {activeTab === 0 && (
        <div style={{ padding: 20, color: "whitesmoke" }}>
          <h3 style={{ textAlign: "center" }}>{scoreData.team1} Scorecard</h3>
          <SingleTeamScoreCard
            team={scoreData.team1}
            teamData={teamData}
            stats={scoreData.team1Stats}
            ballsFaced={scoreData.team1BallsFacedByPlayer}
            track={track?.team1}
          />
        </div>
      )}

      {activeTab === 1 && (
        <div style={{ padding: 20, color: "whitesmoke" }}>
          <h3 style={{ textAlign: "center" }}>{scoreData.team2} Scorecard</h3>
          <SingleTeamScoreCard
            team={scoreData.team2}
            teamData={teamData}
            stats={scoreData.team2Stats}
            ballsFaced={scoreData.team2BallsFacedByPlayer}
            track={track?.team2}
          />
        </div>
      )}

      {activeTab === 2 && (
        <TournamentStandings 
          standings={standings} 
          onContinue={() => {}}
          stage={currentStage}
        />
      )}

      {activeTab === 3 && (
        <StatsTab playerStats={playerStats} />
      )}

      <div style={{ textAlign: "center", marginTop: 20, padding: 20 }}>
        {showNextButton && (
          <Button 
            variant="contained" 
            color="primary" 
            onClick={onNextMatch}
            style={{ marginRight: 10 }}
          >
            {nextButtonText}
          </Button>
        )}
        <Button variant="outlined" style={{ color: "whitesmoke" }} onClick={onExit}>
          Exit Tournament
        </Button>
      </div>
    </div>
  );
}

export default PostMatchView;
