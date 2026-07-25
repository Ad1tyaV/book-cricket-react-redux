import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import MatchComponent from "./MatchComponent";
import TournamentStandings from "./TournamentStandings";
import StatsTab from "./StatsTab";
import { getPlayerName } from "../helpers/teamHelpers";

function TournamentMatchView({
  pitchType,
  standings,
  playerStats,
  currentStage,
  scoreData,
  teamData,
  isMatchOver,
}) {
  const [activeTab, setActiveTab] = useState(0);
  const currentTeamBalls =
    scoreData.currentTeamBatting === scoreData.team1
      ? scoreData.team1BallsFaced
      : scoreData.team2BallsFaced;
  const currentTeamScore =
    scoreData.currentTeamBatting === scoreData.team1
      ? `${scoreData.team1Total}/${scoreData.team1Wickets}`
      : `${scoreData.team2Total}/${scoreData.team2Wickets}`;
  const currentTeamOvers = `${Math.floor(currentTeamBalls / 6)}.${
    currentTeamBalls % 6
  }`;

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

      {activeTab === 0 && <MatchComponent pitchType={pitchType} />}

      {activeTab === 1 && (
        <div style={{ padding: 20, color: "whitesmoke" }}>
          <h3 style={{ textAlign: "center" }}>
            {scoreData.currentTeamBatting} - Current Innings
          </h3>
          <p style={{ textAlign: "center", color: "#bbb" }}>
            {currentTeamScore} in {currentTeamOvers} overs
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Table
              style={{ maxWidth: 500, backgroundColor: "#1e1e1e" }}
              aria-label="batting scorecard"
            >
              <TableBody>
                {Array.from({ length: 11 }, (_, index) => index).map((index) => {
                  const isOnStrike = scoreData.onStrike.batterIndex === index;
                  const isOffStrike = scoreData.offStrike.batterIndex === index;
                  const isOut = (
                    scoreData.currentTeamBatting === scoreData.team1
                      ? scoreData.team1Dismissed
                      : scoreData.team2Dismissed
                  )?.includes(index);

                  const currentTeamStats =
                    scoreData.currentTeamBatting === scoreData.team1
                      ? scoreData.team1Stats
                      : scoreData.team2Stats;
                  const currentTeamBalls =
                    scoreData.currentTeamBatting === scoreData.team1
                      ? scoreData.team1BallsFacedByPlayer
                      : scoreData.team2BallsFacedByPlayer;

                  return (
                    <TableRow key={`batting-${index}`}>
                      <TableCell
                        style={{
                          color:
                            isOnStrike || isOffStrike
                              ? "#72ff72"
                              : isOut
                              ? "red"
                              : "gray",
                        }}
                      >
                        {getPlayerName(
                          (scoreData.currentTeamBatting === scoreData.team1
                            ? scoreData.team1PlayingXI
                            : scoreData.team2PlayingXI)?.[index]
                        )}
                        {isOnStrike && " *"}
                      </TableCell>
                      <TableCell style={{ color: "whitesmoke" }}>
                        {currentTeamStats[index] ?? 0} (
                        {currentTeamBalls?.[index] ?? 0})
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

      {activeTab === 3 && <StatsTab playerStats={playerStats} />}
    </div>
  );
}

export default TournamentMatchView;
