import React, { useState } from "react";
import { Tabs, Tab, Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import MatchComponent from "./MatchComponent";
import TournamentStandings from "./TournamentStandings";
import StatsTab from "./StatsTab";

function TournamentMatchView({ 
  pitchType, 
  standings, 
  playerStats, 
  currentStage,
  scoreData,
  teamData,
  isMatchOver
}) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <Tabs 
        value={activeTab} 
        onChange={(e, val) => setActiveTab(val)} 
        style={{ backgroundColor: "#333" }}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Live Match" style={{ color: "whitesmoke" }} />
        <Tab label="Current Batting" style={{ color: "whitesmoke" }} />
        <Tab label="Standings" style={{ color: "whitesmoke" }} />
        <Tab label="Stats" style={{ color: "whitesmoke" }} />
      </Tabs>

      {activeTab === 0 && (
        <MatchComponent pitchType={pitchType} />
      )}

      {activeTab === 1 && (
        <div style={{ padding: 20, color: "whitesmoke" }}>
          <h3 style={{ textAlign: "center" }}>
            {scoreData.currentTeamBatting} - Current Innings
          </h3>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Table
              style={{ maxWidth: 500, backgroundColor: "#1e1e1e" }}
              aria-label="batting scorecard"
            >
              <TableBody>
                {[-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => {
                  const isOnStrike = scoreData.onStrike.batterIndex === index;
                  const isOffStrike = scoreData.offStrike.batterIndex === index;
                  const isOut = index < Math.min(scoreData.onStrike.batterIndex, scoreData.offStrike.batterIndex) ||
                               (index > Math.min(scoreData.onStrike.batterIndex, scoreData.offStrike.batterIndex) &&
                                index < Math.max(scoreData.onStrike.batterIndex, scoreData.offStrike.batterIndex));
                  
                  const currentTeamStats = scoreData.currentTeamBatting === scoreData.team1 
                    ? scoreData.team1Stats 
                    : scoreData.team2Stats;
                  const currentTeamBalls = scoreData.currentTeamBatting === scoreData.team1 
                    ? scoreData.team1BallsFacedByPlayer 
                    : scoreData.team2BallsFacedByPlayer;
                  
                  return (
                    <TableRow key={`batting-${index}`}>
                      <TableCell
                        style={{
                          color: isOnStrike || isOffStrike ? "#72ff72" : (isOut ? "red" : "gray"),
                        }}
                      >
                        {teamData?.[scoreData.currentTeamBatting]?.[index] || "Player"}
                        {isOnStrike && " *"}
                      </TableCell>
                      <TableCell style={{ color: "whitesmoke" }}>
                        {currentTeamStats[index] ?? 0} ({currentTeamBalls?.[index] ?? 0})
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
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
    </div>
  );
}

export default TournamentMatchView;
