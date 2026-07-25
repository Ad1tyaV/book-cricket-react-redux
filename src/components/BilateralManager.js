import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import pickTeams from "../redux-setup/actions/pickTeams";
import resetState from "../redux-setup/actions/resetState";
import MatchComponent from "./MatchComponent";
import MatchSetup from "./MatchSetup";
import { Button, Tabs, Tab } from "@material-ui/core";
import { getMatchResult } from "../helpers/matchResultHelper";
import StatsTab from "./StatsTab";
import { mergeInningsBattingStats } from "../helpers/playerStatsHelper";

function BilateralManager({
  config,
  onExit,
  scoreData,
  pickTeamDispatch,
  resetDispatch,
}) {
  const [currentMatch, setCurrentMatch] = useState(1);
  const [seriesScore, setSeriesScore] = useState({ team1: 0, team2: 0 });
  const [matchResults, setMatchResults] = useState([]);
  const [matchSetupPending, setMatchSetupPending] = useState(true);
  const [currentPitchType, setCurrentPitchType] = useState("Normal");
  const [playerStats, setPlayerStats] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const recordedMatch = useRef(null);

  useEffect(() => {
    // Don't auto-start, wait for match setup
  }, []);

  useEffect(() => {
    if (
      scoreData.gameover &&
      currentMatch <= config.numMatches &&
      !matchSetupPending &&
      recordedMatch.current !== currentMatch
    ) {
      recordedMatch.current = currentMatch;
      // Update series score
      const battingFirstWon = scoreData.team1Total > scoreData.team2Total;
      const chasingTeamWon = scoreData.team2Total > scoreData.team1Total;
      const winner = battingFirstWon
        ? scoreData.team1
        : chasingTeamWon
        ? scoreData.team2
        : null;

      setSeriesScore((previous) => ({
        team1: previous.team1 + (winner === config.team1 ? 1 : 0),
        team2: previous.team2 + (winner === config.team2 ? 1 : 0),
      }));

      // Record match result
      const result = {
        matchNum: currentMatch,
        team1Score: `${scoreData.team1Total}/${scoreData.team1Wickets}`,
        team2Score: `${scoreData.team2Total}/${scoreData.team2Wickets}`,
        winner: winner || "Tie",
        result: getMatchResult(scoreData),
      };
      setMatchResults((previous) => [...previous, result]);
      setPlayerStats((previous) => {
        const withFirstInnings = mergeInningsBattingStats(
          previous,
          scoreData.team1,
          scoreData.team1PlayingXI,
          scoreData.team1Stats,
          scoreData.team1BallsFacedByPlayer
        );
        return mergeInningsBattingStats(
          withFirstInnings,
          scoreData.team2,
          scoreData.team2PlayingXI,
          scoreData.team2Stats,
          scoreData.team2BallsFacedByPlayer
        );
      });
    }
  }, [config, currentMatch, matchSetupPending, scoreData]);

  const handleMatchStart = (matchConfig) => {
    const { pitchType, battingFirst, playingXIs } = matchConfig;

    // Determine team order based on toss
    const team1 = battingFirst;
    const team2 = battingFirst === config.team1 ? config.team2 : config.team1;

    setCurrentPitchType(pitchType);
    pickTeamDispatch(
      team1,
      team2,
      config.overs,
      config.format,
      playingXIs?.[team1],
      playingXIs?.[team2]
    );
    setMatchSetupPending(false);
  };

  const handleNextMatch = () => {
    if (currentMatch < config.numMatches) {
      setCurrentMatch(currentMatch + 1);
      setMatchSetupPending(true);
      setActiveTab(0);
      resetDispatch();
    }
  };

  const isSeriesComplete =
    currentMatch === config.numMatches && scoreData.gameover;
  const seriesWinner =
    seriesScore.team1 > seriesScore.team2
      ? config.team1
      : seriesScore.team2 > seriesScore.team1
      ? config.team2
      : "Series Tied";

  // Show match setup
  if (matchSetupPending) {
    return (
      <div>
        <div
          style={{
            textAlign: "center",
            padding: 10,
            color: "whitesmoke",
            backgroundColor: "#333",
          }}
        >
          <h3>
            Match {currentMatch} of {config.numMatches}
          </h3>
          <p>
            Series Score: {config.team1} {seriesScore.team1} -{" "}
            {seriesScore.team2} {config.team2}
          </p>
        </div>
        <MatchSetup
          match={{
            team1: config.team1,
            team2: config.team2,
            stage: `Match ${currentMatch}`,
            format: config.format,
          }}
          onStartMatch={handleMatchStart}
        />
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          padding: 10,
          color: "whitesmoke",
          backgroundColor: "#333",
        }}
      >
        <h3>
          Match {currentMatch} of {config.numMatches}
        </h3>
        <p>
          Series Score: {config.team1} {seriesScore.team1} - {seriesScore.team2}{" "}
          {config.team2}
        </p>
      </div>

      <Tabs
        value={activeTab}
        onChange={(event, value) => setActiveTab(value)}
        centered
        style={{ backgroundColor: "#17212b" }}
      >
        <Tab label="Live Match" style={{ color: "whitesmoke" }} />
        <Tab label="Series Stats" style={{ color: "whitesmoke" }} />
      </Tabs>

      {activeTab === 0 && scoreData.team1 && (
        <MatchComponent pitchType={currentPitchType} />
      )}
      {activeTab === 1 && (
        <StatsTab
          playerStats={playerStats}
          title="Bilateral Series Statistics"
          minimumRuns={1}
        />
      )}

      {scoreData.gameover && (
        <div
          style={{ textAlign: "center", marginTop: 20, color: "whitesmoke" }}
        >
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
              <h3>
                {seriesWinner} wins the series {seriesScore.team1}-
                {seriesScore.team2}
              </h3>
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
          <Button
            variant="outlined"
            style={{ color: "whitesmoke", marginTop: 10 }}
            onClick={onExit}
          >
            Exit Series
          </Button>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  scoreData: state.manageScores,
});

const mapDispatchToProps = (dispatch) => ({
  pickTeamDispatch: (
    team1,
    team2,
    overs,
    format,
    team1PlayingXI,
    team2PlayingXI
  ) =>
    dispatch(
      pickTeams(team1, team2, overs, format, team1PlayingXI, team2PlayingXI)
    ),
  resetDispatch: () => dispatch(resetState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BilateralManager);
