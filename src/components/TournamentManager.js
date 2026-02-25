import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import pickTeams from "../redux-setup/actions/pickTeams";
import resetState from "../redux-setup/actions/resetState";
import simulateMatch from "../redux-setup/actions/simulateMatch";
import MatchSetup from "./MatchSetup";
import TournamentMatchView from "./TournamentMatchView";
import PostMatchView from "./PostMatchView";
import FixturesView from "./FixturesView";
import TournamentStandings from "./TournamentStandings";
import StatsTab from "./StatsTab";
import { Button, Tabs, Tab } from "@material-ui/core";

function TournamentManager({ config, onExit, scoreData, pickTeamDispatch, resetDispatch, simulateMatchDispatch, teamData }) {
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [matches, setMatches] = useState([]);
  const [standings, setStandings] = useState([]);
  const [playerStats, setPlayerStats] = useState([]);
  const [currentStage, setCurrentStage] = useState("Group Stage");
  const [matchSetupPending, setMatchSetupPending] = useState(true);
  const [currentMatchConfig, setCurrentMatchConfig] = useState(null);
  const [track, setTrack] = useState({});
  const [completedMatches, setCompletedMatches] = useState({});
  const [showFixtures, setShowFixtures] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [viewingMatchKey, setViewingMatchKey] = useState(null);
  const [simulatingMatchIndex, setSimulatingMatchIndex] = useState(null);
  const [simulationQueue, setSimulationQueue] = useState([]);
  const [showTournamentSummary, setShowTournamentSummary] = useState(false);
  const [summaryTab, setSummaryTab] = useState(0);

  const getMatchKey = (stage, index) => `${stage}-${index}`;
  const currentStageCompletedMatches = matches.reduce((acc, match, index) => {
    const key = getMatchKey(currentStage, index);
    if (completedMatches[key]) {
      acc[index] = completedMatches[key];
    }
    return acc;
  }, {});
  const finishedFixtures = Object.values(completedMatches);
  const isTournamentComplete =
    currentStage === "Final" &&
    matches.length === 1 &&
    Boolean(completedMatches[getMatchKey("Final", 0)]);

  const getTournamentOutcome = (matchScore, stageName) => {
    const { team1, team2, team1Total, team2Total, team1Wickets, team2Wickets } = matchScore;
    const isGroupStage = stageName.includes("Group");
    const isFinal = stageName === "Final";
    const isSemiFinal = stageName === "Semi-Final";

    if (team1Total > team2Total) {
      const runMargin = team1Total - team2Total;
      return {
        result: `${team1} won by ${runMargin} run${runMargin !== 1 ? "s" : ""}`,
        winner: team1,
        noResult: false
      };
    }

    if (team2Total > team1Total) {
      const wicketsRemaining = 10 - team2Wickets;
      return {
        result: `${team2} won by ${wicketsRemaining} wicket${wicketsRemaining !== 1 ? "s" : ""}`,
        winner: team2,
        noResult: false
      };
    }

    if (isGroupStage) {
      return {
        result: "No Result (Scores Level)",
        winner: null,
        noResult: true
      };
    }

    if (team1Wickets < team2Wickets) {
      return {
        result: `${team1} won (scores level, fewer wickets lost: ${team1Wickets} vs ${team2Wickets})`,
        winner: team1,
        noResult: false
      };
    }

    if (team2Wickets < team1Wickets) {
      return {
        result: `${team2} won (scores level, fewer wickets lost: ${team2Wickets} vs ${team1Wickets})`,
        winner: team2,
        noResult: false
      };
    }

    if (isFinal) {
      return {
        result: `Final tied: ${team1} and ${team2} are joint winners`,
        winner: null,
        noResult: false
      };
    }

    if (isSemiFinal) {
      const randomWinner = Math.random() > 0.5 ? team1 : team2;
      return {
        result: `Semi-Final tied (same runs and wickets): ${randomWinner} advance by random draw`,
        winner: randomWinner,
        noResult: false
      };
    }

    return { result: "Match Tied", winner: null, noResult: false };
  };

  useEffect(() => {
    // Initialize tournament
    const teams = [...config.teams]; // Copy array
    const numTeams = teams.length;
    
    // Randomize team order
    for (let i = teams.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [teams[i], teams[j]] = [teams[j], teams[i]];
    }
    
    let groupMatches = [];
    
    // Check if even number of teams for group stage split
    if (numTeams % 2 === 0 && numTeams >= 4) {
      // Split into two groups
      const groupA = teams.slice(0, numTeams / 2);
      const groupB = teams.slice(numTeams / 2);
      
      // Generate matches within Group A
      for (let i = 0; i < groupA.length; i++) {
        for (let j = i + 1; j < groupA.length; j++) {
          groupMatches.push({
            team1: groupA[i],
            team2: groupA[j],
            stage: "Group A",
            group: "A"
          });
        }
      }
      
      // Generate matches within Group B
      for (let i = 0; i < groupB.length; i++) {
        for (let j = i + 1; j < groupB.length; j++) {
          groupMatches.push({
            team1: groupB[i],
            team2: groupB[j],
            stage: "Group B",
            group: "B"
          });
        }
      }
    } else {
      // Round-robin for odd number of teams
      for (let i = 0; i < teams.length; i++) {
        for (let j = i + 1; j < teams.length; j++) {
          groupMatches.push({
            team1: teams[i],
            team2: teams[j],
            stage: "Group Stage",
            group: "ALL"
          });
        }
      }
    }

    setMatches(groupMatches);
    
    // Initialize standings
    const initialStandings = teams.map(team => ({
      name: team,
      played: 0,
      won: 0,
      lost: 0,
      noResult: 0,
      nrr: 0,
      points: 0,
      runsScored: 0,
      ballsFaced: 0,
      runsConceded: 0,
      ballsBowled: 0,
      group: numTeams % 2 === 0 ? 
        (teams.indexOf(team) < numTeams / 2 ? "A" : "B") : 
        "ALL"
    }));
    setStandings(initialStandings);
    
    // Set first match for setup
    if (groupMatches.length > 0) {
      setCurrentMatchConfig(groupMatches[0]);
    }
  }, [config.teams]);

  useEffect(() => {
    // Check if current match is over
    if (scoreData.gameover && !matchSetupPending && matches.length > 0) {
      // Only update if not already saved
      const currentMatchKey = getMatchKey(currentStage, currentMatchIndex);
      if (!completedMatches[currentMatchKey]) {
        const outcome = getTournamentOutcome(scoreData, currentStage);
        updateStandingsAndStats(outcome);
        
        // Save track data
        const currentTrack = {
          team1: scoreData.team1LastPair || { player_1: -1, player_2: 0 },
          team2: scoreData.team2LastPair || {
            player_1: scoreData.onStrike.batterIndex,
            player_2: scoreData.offStrike.batterIndex
          }
        };
        
        setTrack(currentTrack);
        
        // Save completed match result with full scoreData
        const matchResult = {
          key: currentMatchKey,
          stage: currentStage,
          matchIndex: currentMatchIndex,
          team1: scoreData.team1,
          team2: scoreData.team2,
          team1Score: `${scoreData.team1Total}/${scoreData.team1Wickets}`,
          team2Score: `${scoreData.team2Total}/${scoreData.team2Wickets}`,
          result: outcome.result,
          winner: outcome.winner,
          noResult: outcome.noResult,
          completedAt: Date.now(),
          // Store full match data for viewing later
          scoreData: {
            team1: scoreData.team1,
            team2: scoreData.team2,
            team1Total: scoreData.team1Total,
            team2Total: scoreData.team2Total,
            team1Wickets: scoreData.team1Wickets,
            team2Wickets: scoreData.team2Wickets,
            team1Stats: { ...scoreData.team1Stats },
            team2Stats: { ...scoreData.team2Stats },
            team1BallsFacedByPlayer: { ...scoreData.team1BallsFacedByPlayer },
            team2BallsFacedByPlayer: { ...scoreData.team2BallsFacedByPlayer }
          },
          track: currentTrack
        };
        
        setCompletedMatches(prev => ({
          ...prev,
          [currentMatchKey]: matchResult
        }));
      }
      
      // Always reset simulation state when match is over
      setIsSimulating(false);
      setSimulatingMatchIndex(null);
    }
  }, [scoreData.gameover, matchSetupPending, matches.length, currentMatchIndex, currentStage, completedMatches]);

  useEffect(() => {
    if (isSimulating || matches.length === 0) return;

    const allMatchesCompleted = matches.every((_, index) =>
      Boolean(completedMatches[getMatchKey(currentStage, index)])
    );
    if (!allMatchesCompleted) return;

    if (currentStage.includes("Group")) {
      generateSemiFinals();
      return;
    }

    if (currentStage === "Semi-Final") {
      const winners = matches
        .map((_, index) => completedMatches[getMatchKey(currentStage, index)]?.winner)
        .filter(Boolean);

      if (winners.length === 2) {
        generateFinal(winners);
      }
    }
  }, [completedMatches, matches, currentStage, isSimulating]);

  useEffect(() => {
    if (isSimulating || simulationQueue.length === 0) return;
    const [nextMatchIndex, ...remainingQueue] = simulationQueue;
    setSimulationQueue(remainingQueue);
    handleSimulateMatch(nextMatchIndex);
  }, [isSimulating, simulationQueue]);

  const updateStandingsAndStats = (outcome) => {
    // Use actual teams from scoreData (which reflects the toss decision)
    const team1 = scoreData.team1;  // Team that batted first
    const team2 = scoreData.team2;  // Team that batted second
    const team1Score = scoreData.team1Total;
    const team2Score = scoreData.team2Total;
    const team1Balls = scoreData.team1BallsFaced;
    const team2Balls = scoreData.team2BallsFaced;

    // Knockout matches should not affect league standings table.
    if (currentStage.includes("Group")) {
      const newStandings = standings.map(team => {
        if (team.name === team1) {
          const won = outcome.winner === team1 ? 1 : 0;
          const lost = outcome.winner === team2 ? 1 : 0;
          const noResult = outcome.noResult ? 1 : 0;
          return {
            ...team,
            played: team.played + 1,
            won: team.won + won,
            lost: team.lost + lost,
            noResult: team.noResult + noResult,
            points: team.points + (won * 2) + (noResult * 1),
            runsScored: team.runsScored + team1Score,
            ballsFaced: team.ballsFaced + team1Balls,
            runsConceded: team.runsConceded + team2Score,
            ballsBowled: team.ballsBowled + team2Balls
          };
        } else if (team.name === team2) {
          const won = outcome.winner === team2 ? 1 : 0;
          const lost = outcome.winner === team1 ? 1 : 0;
          const noResult = outcome.noResult ? 1 : 0;
          return {
            ...team,
            played: team.played + 1,
            won: team.won + won,
            lost: team.lost + lost,
            noResult: team.noResult + noResult,
            points: team.points + (won * 2) + (noResult * 1),
            runsScored: team.runsScored + team2Score,
            ballsFaced: team.ballsFaced + team2Balls,
            runsConceded: team.runsConceded + team1Score,
            ballsBowled: team.ballsBowled + team1Balls
          };
        }
        return team;
      });

      newStandings.forEach(team => {
        const runRate = team.ballsFaced > 0 ? (team.runsScored / team.ballsFaced) * 6 : 0;
        const concededRate = team.ballsBowled > 0 ? (team.runsConceded / team.ballsBowled) * 6 : 0;
        team.nrr = runRate - concededRate;
      });

      setStandings(newStandings);
    }

    // Update player stats for both teams at once
    updatePlayerStatsForMatch(team1, team2, scoreData.team1Stats, scoreData.team2Stats, scoreData.team1BallsFacedByPlayer, scoreData.team2BallsFacedByPlayer);
  };

  const updatePlayerStatsForMatch = (team1Name, team2Name, team1Stats, team2Stats, team1Balls, team2Balls) => {
    const newPlayerStats = [...playerStats];
    
    // Update team 1 players
    Object.keys(team1Stats).forEach(playerIndex => {
      const playerName = teamData[team1Name]?.[playerIndex];
      const runs = team1Stats[playerIndex] || 0;
      const balls = team1Balls[playerIndex] || 0;
      
      if (playerName && runs > 0) {
        const existingPlayer = newPlayerStats.find(p => p.name === playerName && p.team === team1Name);
        if (existingPlayer) {
          existingPlayer.runs += runs;
          existingPlayer.balls += balls;
          existingPlayer.strikeRate = (existingPlayer.runs / existingPlayer.balls) * 100;
        } else {
          newPlayerStats.push({
            name: playerName,
            team: team1Name,
            runs: runs,
            balls: balls,
            strikeRate: (runs / balls) * 100
          });
        }
      }
    });
    
    // Update team 2 players
    Object.keys(team2Stats).forEach(playerIndex => {
      const playerName = teamData[team2Name]?.[playerIndex];
      const runs = team2Stats[playerIndex] || 0;
      const balls = team2Balls[playerIndex] || 0;
      
      if (playerName && runs > 0) {
        const existingPlayer = newPlayerStats.find(p => p.name === playerName && p.team === team2Name);
        if (existingPlayer) {
          existingPlayer.runs += runs;
          existingPlayer.balls += balls;
          existingPlayer.strikeRate = (existingPlayer.runs / existingPlayer.balls) * 100;
        } else {
          newPlayerStats.push({
            name: playerName,
            team: team2Name,
            runs: runs,
            balls: balls,
            strikeRate: (runs / balls) * 100
          });
        }
      }
    });
    
    setPlayerStats(newPlayerStats);
  };

  const handleMatchStart = (matchConfig) => {
    const { pitchType, battingFirst } = matchConfig;
    const match = currentMatchConfig;
    
    // Determine team order based on toss
    const team1 = battingFirst;
    const team2 = battingFirst === match.team1 ? match.team2 : match.team1;
    
    pickTeamDispatch(team1, team2, config.overs, config.format);
    setMatchSetupPending(false);
    setShowFixtures(false);
    setSimulationQueue([]);
    
    // Store pitch type AND the actual playing order for this match
    setCurrentMatchConfig({ 
      ...match, 
      pitchType,
      actualTeam1: team1,  // Team batting first
      actualTeam2: team2   // Team batting second
    });
  };

  const handleSimulateMatch = (matchIndex) => {
    // Auto-select random pitch and toss
    const pitchTypes = ["Normal", "Hard", "Wet", "Green", "Dusty"];
    const randomPitch = pitchTypes[Math.floor(Math.random() * pitchTypes.length)];
    const match = matches[matchIndex];
    const tossWinner = Math.random() > 0.5 ? match.team1 : match.team2;
    const tossDecision = Math.random() > 0.5 ? "bat" : "bowl";
    const battingFirst = tossDecision === "bat" ? tossWinner : 
                         (tossWinner === match.team1 ? match.team2 : match.team1);
    
    const team1 = battingFirst;
    const team2 = battingFirst === match.team1 ? match.team2 : match.team1;
    
    // Set current match index and show simulation in progress
    setCurrentMatchIndex(matchIndex);
    setSimulatingMatchIndex(matchIndex);
    setIsSimulating(true);
    setMatchSetupPending(false);
    // Keep fixtures view open to show progress
    
    // Start the match
    pickTeamDispatch(team1, team2, config.overs, config.format);
    
    setCurrentMatchConfig({ 
      ...match, 
      pitchType: randomPitch,
      actualTeam1: team1,
      actualTeam2: team2
    });
    
    // Simulate full match after teams are picked and state is ready
    setTimeout(() => {
      simulateMatchDispatch(randomPitch);
    }, 200);
  };

  const handleSelectMatch = (matchIndex) => {
    setSimulationQueue([]);
    const matchKey = getMatchKey(currentStage, matchIndex);
    if (completedMatches[matchKey]) {
      // Show completed match details
      setViewingMatchKey(matchKey);
      setShowFixtures(false);
    } else if (matchIndex === currentMatchIndex && scoreData.team1 && !scoreData.gameover) {
      // Resume current match in progress
      setShowFixtures(false);
      setViewingMatchKey(null);
    } else {
      // Start a new match
      setCurrentMatchIndex(matchIndex);
      setCurrentMatchConfig(matches[matchIndex]);
      setMatchSetupPending(true);
      setShowFixtures(false);
      setViewingMatchKey(null);
    }
  };

  const handleNextMatch = () => {
    setSimulationQueue([]);
    const nextIndex = currentMatchIndex + 1;

    if (nextIndex < matches.length) {
      // Continue with current stage
      setCurrentMatchIndex(nextIndex);
      setCurrentMatchConfig(matches[nextIndex]);
      setMatchSetupPending(true);
      setIsSimulating(false); // Reset simulation state
      resetDispatch();
    } else if (currentStage.includes("Group")) {
      // Group stage complete, generate semi-finals
      generateSemiFinals();
    } else if (currentStage === "Semi-Final") {
      const winners = matches
        .map((_, index) => completedMatches[getMatchKey(currentStage, index)]?.winner)
        .filter(Boolean);
      if (winners.length === 2) {
        generateFinal(winners);
      }
    } else if (currentStage === "Final") {
      setShowTournamentSummary(true);
    }
  };

  const moveToStage = (stageMatches, stageName) => {
    setMatches(stageMatches);
    setCurrentMatchIndex(0);
    setCurrentStage(stageName);
    setCurrentMatchConfig(stageMatches[0] || null);
    setMatchSetupPending(true);
    setViewingMatchKey(null);
    setSimulatingMatchIndex(null);
    setSimulationQueue([]);
    setIsSimulating(false);
    setShowTournamentSummary(false);
    resetDispatch();
  };

  const generateSemiFinals = () => {
    const sortedStandings = [...standings].sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      return b.nrr - a.nrr;
    });
    
    let semiFinals = [];
    
    if (standings[0].group === "ALL") {
      // Single group - top 4 teams
      if (sortedStandings.length >= 4) {
        semiFinals = [
          { team1: sortedStandings[0].name, team2: sortedStandings[3].name, stage: "Semi-Final 1" },
          { team1: sortedStandings[1].name, team2: sortedStandings[2].name, stage: "Semi-Final 2" }
        ];
      }
    } else {
      // Two groups - top team from each group (for 4-team tournament)
      const groupAStandings = sortedStandings.filter(t => t.group === "A");
      const groupBStandings = sortedStandings.filter(t => t.group === "B");
      
      // For 4-team tournament (2 teams per group), top 1 from each group goes to final directly
      if (groupAStandings.length === 2 && groupBStandings.length === 2) {
        // This is a 4-team tournament - go straight to final
        const finalMatch = [
          { 
            team1: groupAStandings[0].name, 
            team2: groupBStandings[0].name, 
            stage: "Final" 
          }
        ];
        
        moveToStage(finalMatch, "Final");
        return; // Exit early
      } else {
        // More than 4 teams - top 2 from each group
        const groupA = groupAStandings.slice(0, 2);
        const groupB = groupBStandings.slice(0, 2);
        
        semiFinals = [
          { team1: groupA[0].name, team2: groupB[1].name, stage: "Semi-Final 1" },
          { team1: groupB[0].name, team2: groupA[1].name, stage: "Semi-Final 2" }
        ];
      }
    }
    
    moveToStage(semiFinals, "Semi-Final");
  };

  const generateFinal = (winners) => {
    if (winners.length === 2) {
      const finalMatch = [
        { 
          team1: winners[0], 
          team2: winners[1], 
          stage: "Final" 
        }
      ];

      moveToStage(finalMatch, "Final");
    } else {
      alert("Error: Semi-final winners not properly tracked");
      onExit();
    }
  };

  const handleShowStandings = () => {
    setSummaryTab(0);
    setShowTournamentSummary(true);
  };

  const handleShowStats = () => {
    setSummaryTab(1);
    setShowTournamentSummary(true);
  };

  const handleViewFinishedMatch = (matchKey) => {
    setSimulationQueue([]);
    setViewingMatchKey(matchKey);
    setShowFixtures(false);
  };

  const handleSimulateTeamMatches = (teamName) => {
    const hasMatchInProgress = scoreData.team1 && scoreData.team2 && !scoreData.gameover && !isSimulating;
    if (hasMatchInProgress || isSimulating) return;

    const remainingMatches = matches
      .map((match, index) => ({ match, index }))
      .filter(({ match, index }) => {
        const isTeamMatch = match.team1 === teamName || match.team2 === teamName;
        const isCompleted = Boolean(currentStageCompletedMatches[index]);
        return isTeamMatch && !isCompleted;
      })
      .map(({ index }) => index);

    if (remainingMatches.length === 0) return;

    const [firstMatchIndex, ...restMatches] = remainingMatches;
    setSimulationQueue(restMatches);
    handleSimulateMatch(firstMatchIndex);
  };

  if (showTournamentSummary) {
    return (
      <div>
        <div style={{ textAlign: "center", padding: 10, color: "whitesmoke", backgroundColor: "#333" }}>
          <Button
            variant="outlined"
            style={{ color: "whitesmoke", position: "absolute", left: 20, top: 15 }}
              onClick={() => setShowTournamentSummary(false)}
            >
              Back
            </Button>
          <h3>Tournament Summary</h3>
        </div>
        <Tabs
          value={summaryTab}
          onChange={(e, val) => setSummaryTab(val)}
          style={{ backgroundColor: "#333" }}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Standings" style={{ color: "whitesmoke" }} />
          <Tab label="Stats" style={{ color: "whitesmoke" }} />
        </Tabs>
        {summaryTab === 0 && <TournamentStandings standings={standings} stage="Tournament" />}
        {summaryTab === 1 && <StatsTab playerStats={playerStats} />}
        <div style={{ textAlign: "center", marginTop: 20, paddingBottom: 20 }}>
          <Button variant="outlined" style={{ color: "whitesmoke" }} onClick={onExit}>
            Exit Tournament
          </Button>
        </div>
      </div>
    );
  }

  // Show fixtures view
  if (showFixtures) {
    const hasMatchInProgress = scoreData.team1 && scoreData.team2 && !scoreData.gameover && !isSimulating;
    
    return (
      <div>
        <div style={{ textAlign: "center", padding: 10, color: "whitesmoke", backgroundColor: "#333" }}>
          <Button 
            variant="outlined" 
            style={{ color: "whitesmoke", position: "absolute", left: 20, top: 15 }}
            onClick={() => setShowFixtures(false)}
          >
            Back
          </Button>
          <h3>{currentStage}</h3>
          <Button
            variant="outlined"
            style={{ color: "whitesmoke", position: "absolute", right: 170, top: 15 }}
            onClick={handleShowStandings}
          >
            Standings
          </Button>
          <Button
            variant="outlined"
            style={{ color: "whitesmoke", position: "absolute", right: 20, top: 15 }}
            onClick={handleShowStats}
          >
            Stats
          </Button>
          {isTournamentComplete && (
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 10 }}
              onClick={handleShowStats}
            >
              View Tournament Stats
            </Button>
          )}
          {hasMatchInProgress && (
            <p style={{ color: "#FFA726", fontSize: "0.9em" }}>
              Match in progress - complete or view current match before simulating others
            </p>
          )}
        </div>
        <FixturesView
          matches={matches}
          completedMatches={currentStageCompletedMatches}
          currentMatchIndex={currentMatchIndex}
          onSelectMatch={handleSelectMatch}
          onSimulateMatch={handleSimulateMatch}
          onViewFinishedMatch={handleViewFinishedMatch}
          onSimulateTeamMatches={handleSimulateTeamMatches}
          stage={currentStage}
          simulatingMatchIndex={simulatingMatchIndex}
          hasMatchInProgress={hasMatchInProgress}
          finishedFixtures={finishedFixtures}
          isSimulating={isSimulating}
          playerStats={playerStats}
        />
      </div>
    );
  }

  // Show post-match view for completed match being viewed
  if (viewingMatchKey !== null && completedMatches[viewingMatchKey]) {
    const matchData = completedMatches[viewingMatchKey];
    return (
      <div>
        <div style={{ textAlign: "center", padding: 10, color: "whitesmoke", backgroundColor: "#333" }}>
          <Button 
            variant="outlined" 
            style={{ color: "whitesmoke", position: "absolute", left: 20, top: 15 }}
            onClick={() => {
              setViewingMatchKey(null);
              setShowFixtures(true);
            }}
          >
            Back to Fixtures
          </Button>
          <h3>Match Details</h3>
        </div>
        <PostMatchView
          standings={standings}
          playerStats={playerStats}
          currentStage={currentStage}
          scoreData={matchData.scoreData}
          teamData={teamData}
          track={matchData.track}
          onNextMatch={() => {
            setViewingMatchKey(null);
            setShowFixtures(true);
          }}
          onExit={onExit}
          resultOverride={matchData.result}
          showNextButton={false}
          nextButtonText=""
        />
      </div>
    );
  }

  // Show match setup screen
  if (matchSetupPending && currentMatchConfig) {
    return (
      <div>
        <div style={{ textAlign: "center", padding: 10, color: "whitesmoke", backgroundColor: "#333" }}>
          <Button 
            variant="outlined" 
            style={{ color: "whitesmoke", position: "absolute", left: 20, top: 15 }}
            onClick={() => setShowFixtures(true)}
          >
            View Fixtures
          </Button>
          <h3>{currentMatchConfig?.stage || currentStage}</h3>
          <p>Match {currentMatchIndex + 1} of {matches.length}</p>
        </div>
        <MatchSetup 
          match={currentMatchConfig}
          onStartMatch={handleMatchStart}
        />
      </div>
    );
  }

  // Show post-match view
  if (scoreData.gameover && !isSimulating) {
    const currentMatchKey = getMatchKey(currentStage, currentMatchIndex);
    const currentMatchResult =
      completedMatches[currentMatchKey]?.result ||
      getTournamentOutcome(scoreData, currentStage).result;
    return (
      <div>
        <div style={{ textAlign: "center", padding: 10, color: "whitesmoke", backgroundColor: "#333" }}>
          <Button 
            variant="outlined" 
            style={{ color: "whitesmoke", position: "absolute", left: 20, top: 15 }}
            onClick={() => setShowFixtures(true)}
          >
            View Fixtures
          </Button>
        </div>
        <PostMatchView
          standings={standings}
          playerStats={playerStats}
          currentStage={currentStage}
          scoreData={scoreData}
          teamData={teamData}
          track={track}
          onNextMatch={handleNextMatch}
          onExit={onExit}
          resultOverride={currentMatchResult}
          showNextButton={true}
          nextButtonText={
            currentStage === "Final"
              ? "View Tournament Stats"
              : (currentMatchIndex < matches.length - 1 ? "Next Match" : "View Final Standings")
          }
        />
      </div>
    );
  }

  // Show live match view - only if match has started
  if (scoreData.team1 && scoreData.team2 && !isSimulating) {
    return (
      <div>
        <div style={{ textAlign: "center", padding: 10, color: "whitesmoke", backgroundColor: "#333" }}>
          <Button 
            variant="outlined" 
            style={{ color: "whitesmoke", position: "absolute", left: 20, top: 15 }}
            onClick={() => setShowFixtures(true)}
          >
            View Fixtures
          </Button>
          <h3>{currentMatchConfig?.stage || currentStage}</h3>
          <p>Match {currentMatchIndex + 1} of {matches.length}</p>
        </div>
        
        <TournamentMatchView
          pitchType={currentMatchConfig?.pitchType || "Normal"}
          standings={standings}
          playerStats={playerStats}
          currentStage={currentStage}
          scoreData={scoreData}
          teamData={teamData}
          isMatchOver={scoreData.gameover}
        />
      </div>
    );
  }

  // Simulating state
  if (isSimulating) {
    return (
      <div style={{ textAlign: "center", padding: 50, color: "whitesmoke" }}>
        <h3>Simulating match...</h3>
        <p>{scoreData.team1} vs {scoreData.team2}</p>
      </div>
    );
  }

  // Fallback - loading state
  return (
    <div style={{ textAlign: "center", padding: 50, color: "whitesmoke" }}>
      <h3>Loading match...</h3>
    </div>
  );
}

const mapStateToProps = (state) => ({
  scoreData: state.manageScores,
  teamData: state.getTeams
});

const mapDispatchToProps = (dispatch) => ({
  pickTeamDispatch: (team1, team2, overs, format) => dispatch(pickTeams(team1, team2, overs, format)),
  resetDispatch: () => dispatch(resetState()),
  simulateMatchDispatch: (pitchType) => dispatch(simulateMatch(pitchType))
});

export default connect(mapStateToProps, mapDispatchToProps)(TournamentManager);
