import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "@material-ui/core";
import MatchComponent from "./MatchComponent";
import TournamentStandings from "./TournamentStandings";
import StatsTab from "./StatsTab";
import SingleTeamScoreCard from "./SingleTeamScoreCard";
import BowlingScoreCard from "./BowlingScoreCard";
import { formatOvers } from "../helpers/matchResultHelper";
import FallOfWickets from "./FallOfWickets";

function TournamentMatchView({
  pitchType,
  standings,
  playerStats,
  currentStage,
  scoreData,
}) {
  const [activeTab, setActiveTab] = useState(0);
  const [scorecardInnings, setScorecardInnings] = useState(
    scoreData.innings === 2 ? 1 : 0
  );

  useEffect(() => {
    if (scoreData.innings === 2) setScorecardInnings(1);
  }, [scoreData.innings]);

  const battingSide = scorecardInnings === 0 ? "team1" : "team2";
  const bowlingSide = scorecardInnings === 0 ? "team2" : "team1";
  const battingTeam = scoreData[battingSide];
  const bowlingTeam = scoreData[bowlingSide];
  const inningsIsActive = scoreData.currentTeamBatting === battingTeam;
  const battingTrack = inningsIsActive
    ? {
        player_1: scoreData.onStrike.batterIndex,
        player_2: scoreData.offStrike.batterIndex,
      }
    : scoreData[`${battingSide}LastPair`];

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
        <Tab label="Innings Scorecards" style={{ color: "whitesmoke" }} />
        <Tab label="Standings" style={{ color: "whitesmoke" }} />
        <Tab label="Stats" style={{ color: "whitesmoke" }} />
      </Tabs>

      {activeTab === 0 && <MatchComponent pitchType={pitchType} />}

      {activeTab === 1 && (
        <div style={{ padding: 20, color: "whitesmoke" }}>
          <Tabs
            value={scorecardInnings}
            onChange={(event, value) => setScorecardInnings(value)}
            centered
            style={{ backgroundColor: "#2a2a2a", marginBottom: 20 }}
          >
            <Tab
              label={`First Innings · ${scoreData.team1}`}
              style={{ color: "whitesmoke" }}
            />
            <Tab
              label={`Second Innings · ${scoreData.team2}`}
              style={{ color: "whitesmoke" }}
              disabled={scoreData.innings < 2}
            />
          </Tabs>
          <h3 style={{ textAlign: "center" }}>{battingTeam} Batting</h3>
          <p style={{ textAlign: "center", color: "#bbb" }}>
            {scoreData[`${battingSide}Total`]}/
            {scoreData[`${battingSide}Wickets`]} in{" "}
            {formatOvers(scoreData[`${battingSide}BallsFaced`])} overs
          </p>
          <SingleTeamScoreCard
            team={battingTeam}
            format={scoreData.format}
            playingXI={scoreData[`${battingSide}PlayingXI`]}
            stats={scoreData[`${battingSide}Stats`]}
            ballsFaced={scoreData[`${battingSide}BallsFacedByPlayer`]}
            track={battingTrack}
            dismissed={scoreData[`${battingSide}Dismissed`]}
            dismissalDetails={scoreData[`${battingSide}DismissalDetails`]}
            bowlingXI={scoreData[`${bowlingSide}PlayingXI`]}
          />

          <h3 style={{ textAlign: "center", marginTop: 30 }}>
            Fall of Wickets
          </h3>
          <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
            <FallOfWickets
              dismissals={scoreData[`${battingSide}DismissalDetails`]}
              battingXI={scoreData[`${battingSide}PlayingXI`]}
            />
          </div>

          <h3 style={{ textAlign: "center", marginTop: 30 }}>
            {bowlingTeam} Bowling
          </h3>
          <BowlingScoreCard
            playingXI={scoreData[`${bowlingSide}PlayingXI`]}
            stats={scoreData[`${bowlingSide}BowlingStats`]}
            bowlingOrder={scoreData[`${bowlingSide}BowlingOrder`]}
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

      {activeTab === 3 && <StatsTab playerStats={playerStats} />}
    </div>
  );
}

export default TournamentMatchView;
