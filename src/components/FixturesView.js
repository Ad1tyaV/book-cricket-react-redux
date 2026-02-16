import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  LinearProgress,
  Tabs,
  Tab,
  Select,
  MenuItem,
  InputLabel
} from "@material-ui/core";

function FixturesView({ 
  matches, 
  completedMatches, 
  currentMatchIndex, 
  onSelectMatch,
  onSimulateMatch,
  onViewFinishedMatch,
  onSimulateTeamMatches,
  stage,
  simulatingMatchIndex,
  hasMatchInProgress,
  finishedFixtures,
  isSimulating,
  playerStats
}) {
  const [activeTab, setActiveTab] = useState(0);
  const teamsInStage = useMemo(() => {
    const allTeams = matches.flatMap((match) => [match.team1, match.team2]);
    return [...new Set(allTeams)];
  }, [matches]);
  const [selectedTeam, setSelectedTeam] = useState("");

  useEffect(() => {
    if (teamsInStage.length === 0) {
      setSelectedTeam("");
      return;
    }
    if (!teamsInStage.includes(selectedTeam)) {
      setSelectedTeam(teamsInStage[0]);
    }
  }, [teamsInStage, selectedTeam]);

  const remainingMatchesForSelectedTeam = matches.filter((match, index) => {
    const isTeamMatch = match.team1 === selectedTeam || match.team2 === selectedTeam;
    return isTeamMatch && !completedMatches[index];
  }).length;

  const teamPlayers = useMemo(
    () => playerStats.filter((player) => player.team === selectedTeam),
    [playerStats, selectedTeam]
  );

  const topRunScorers = useMemo(
    () => [...teamPlayers].sort((a, b) => b.runs - a.runs).slice(0, 3),
    [teamPlayers]
  );

  const topStrikers = useMemo(
    () =>
      [...teamPlayers]
        .filter((player) => player.balls >= 20)
        .sort((a, b) => b.strikeRate - a.strikeRate)
        .slice(0, 3),
    [teamPlayers]
  );

  const completedTeamMatches = useMemo(
    () =>
      finishedFixtures
        .filter((match) => match.team1 === selectedTeam || match.team2 === selectedTeam)
        .sort((a, b) => a.completedAt - b.completedAt),
    [finishedFixtures, selectedTeam]
  );

  const wins = completedTeamMatches.filter((match) => match.winner === selectedTeam).length;
  const losses = completedTeamMatches.length - wins;
  const winRatio = completedTeamMatches.length > 0
    ? ((wins / completedTeamMatches.length) * 100).toFixed(1)
    : "0.0";

  const teamFixtures = useMemo(
    () =>
      matches
        .map((match, index) => {
          const isTeamMatch = match.team1 === selectedTeam || match.team2 === selectedTeam;
          if (!isTeamMatch) return null;
          const result = completedMatches[index]?.result;
          return {
            index,
            stage: match.stage || stage,
            opponent: match.team1 === selectedTeam ? match.team2 : match.team1,
            status: result
              ? "Completed"
              : (simulatingMatchIndex === index ? "Simulating..." : (index === currentMatchIndex ? "In Progress" : "Upcoming")),
            result: result || "-"
          };
        })
        .filter(Boolean),
    [matches, selectedTeam, completedMatches, stage, simulatingMatchIndex, currentMatchIndex]
  );

  return (
    <div style={{ padding: 20, color: "whitesmoke" }}>
      <h2 style={{ textAlign: "center" }}>{stage} - Fixtures</h2>
      <Tabs
        value={activeTab}
        onChange={(e, val) => setActiveTab(val)}
        style={{ backgroundColor: "#2a2a2a", marginBottom: 20 }}
        variant="fullWidth"
      >
        <Tab label="Fixtures" style={{ color: "whitesmoke" }} />
        <Tab label="Team" style={{ color: "whitesmoke" }} />
      </Tabs>

      {activeTab === 0 && (
        <>
          <Table style={{ maxWidth: 1000, margin: "0 auto", backgroundColor: "#1e1e1e" }}>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>Match</TableCell>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>Teams</TableCell>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>Result</TableCell>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {matches.map((match, index) => {
                const isCompleted = completedMatches[index];
                const isCurrent = index === currentMatchIndex;
                const isSimulating = simulatingMatchIndex === index;
                const isUpcoming = !isCompleted && !isCurrent;
                
                return (
                  <TableRow 
                    key={index}
                    style={{ 
                      backgroundColor: isCurrent ? "#2a4a2a" : (isCompleted ? "#1a1a1a" : "#1e1e1e")
                    }}
                  >
                    <TableCell style={{ color: "whitesmoke" }}>
                      {match.stage || `Match ${index + 1}`}
                    </TableCell>
                    <TableCell style={{ color: "whitesmoke" }}>
                      {match.team1} vs {match.team2}
                    </TableCell>
                    <TableCell style={{ color: isCompleted ? "#4CAF50" : "#888" }}>
                      {isSimulating ? (
                        <div>
                          <div>Simulating...</div>
                          <LinearProgress style={{ marginTop: 5 }} />
                        </div>
                      ) : isCompleted ? (
                        isCompleted.result
                      ) : isCurrent ? (
                        "In Progress"
                      ) : (
                        "Upcoming"
                      )}
                    </TableCell>
                    <TableCell>
                      {isCurrent && !isCompleted && !isSimulating && (
                        <Button 
                          size="small"
                          variant="contained" 
                          color="primary"
                          onClick={() => onSelectMatch(index)}
                        >
                          {hasMatchInProgress ? "Resume" : "Play"}
                        </Button>
                      )}
                      {isUpcoming && !isSimulating && !hasMatchInProgress && (
                        <Button 
                          size="small"
                          variant="outlined" 
                          style={{ color: "whitesmoke" }}
                          onClick={() => onSimulateMatch(index)}
                        >
                          Simulate
                        </Button>
                      )}
                      {isUpcoming && hasMatchInProgress && (
                        <span style={{ color: "#888", fontSize: "0.8em" }}>
                          (Complete current match first)
                        </span>
                      )}
                      {isCompleted && (
                        <Button 
                          size="small"
                          variant="text" 
                          style={{ color: "#4CAF50" }}
                          onClick={() => onSelectMatch(index)}
                        >
                          View Details
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <h2 style={{ textAlign: "center", marginTop: 30 }}>Finished Fixtures</h2>
          <Table style={{ maxWidth: 1000, margin: "0 auto", backgroundColor: "#1e1e1e" }}>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>Stage</TableCell>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>Teams</TableCell>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>Result</TableCell>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {finishedFixtures.length > 0 ? finishedFixtures
                .slice()
                .sort((a, b) => a.completedAt - b.completedAt)
                .map((match) => (
                  <TableRow key={match.key} style={{ backgroundColor: "#1a1a1a" }}>
                    <TableCell style={{ color: "whitesmoke" }}>{match.stage}</TableCell>
                    <TableCell style={{ color: "whitesmoke" }}>
                      {match.team1} vs {match.team2}
                    </TableCell>
                    <TableCell style={{ color: "#4CAF50" }}>{match.result}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="text"
                        style={{ color: "#4CAF50" }}
                        onClick={() => onViewFinishedMatch(match.key)}
                      >
                        View Game
                      </Button>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={4} style={{ color: "#888", textAlign: "center" }}>
                      No finished fixtures yet
                    </TableCell>
                  </TableRow>
                )}
            </TableBody>
          </Table>
        </>
      )}

      {activeTab === 1 && (
        <div style={{ maxWidth: 700, margin: "0 auto", backgroundColor: "#1e1e1e", padding: 20 }}>
          <h3 style={{ textAlign: "center", marginTop: 0 }}>Team Overview</h3>
          <InputLabel shrink style={{ color: "whitesmoke" }}>Team</InputLabel>
          <Select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            style={{ color: "whitesmoke", width: "100%", marginBottom: 20 }}
          >
            {teamsInStage.map(team => (
              <MenuItem value={team} key={team}>{team}</MenuItem>
            ))}
          </Select>
          <p style={{ color: "#bbb", marginTop: 0 }}>
            Remaining matches for {selectedTeam || "selected team"}: {remainingMatchesForSelectedTeam}
          </p>
          <p style={{ color: "#bbb", marginTop: 0 }}>
            Win Ratio: {wins}/{completedTeamMatches.length} ({winRatio}%)
          </p>
          <p style={{ color: "#bbb", marginTop: 0 }}>
            Losses: {losses}
          </p>
          <Button
            variant="contained"
            color="primary"
            disabled={
              !selectedTeam ||
              remainingMatchesForSelectedTeam === 0 ||
              hasMatchInProgress ||
              isSimulating
            }
            onClick={() => onSimulateTeamMatches(selectedTeam)}
          >
            Simulate All Matches
          </Button>
          {(hasMatchInProgress || isSimulating) && (
            <p style={{ color: "#FFA726", marginBottom: 0 }}>
              Finish current simulation/match before running team-level bulk simulation.
            </p>
          )}

          <h4 style={{ marginTop: 24, marginBottom: 8 }}>Top 3 Run Scorers</h4>
          <Table style={{ backgroundColor: "#171717" }}>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>Player</TableCell>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>Runs</TableCell>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>Balls</TableCell>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>SR</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topRunScorers.length > 0 ? topRunScorers.map((player) => (
                <TableRow key={`runs-${player.name}`}>
                  <TableCell style={{ color: "whitesmoke" }}>{player.name}</TableCell>
                  <TableCell style={{ color: "whitesmoke" }}>{player.runs}</TableCell>
                  <TableCell style={{ color: "whitesmoke" }}>{player.balls}</TableCell>
                  <TableCell style={{ color: "whitesmoke" }}>{player.strikeRate.toFixed(2)}</TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={4} style={{ color: "#888", textAlign: "center" }}>
                    No batting stats yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <h4 style={{ marginTop: 24, marginBottom: 8 }}>Top 3 Strike Rates (min 20 balls)</h4>
          <Table style={{ backgroundColor: "#171717" }}>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>Player</TableCell>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>Runs</TableCell>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>Balls</TableCell>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>SR</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topStrikers.length > 0 ? topStrikers.map((player) => (
                <TableRow key={`sr-${player.name}`}>
                  <TableCell style={{ color: "whitesmoke" }}>{player.name}</TableCell>
                  <TableCell style={{ color: "whitesmoke" }}>{player.runs}</TableCell>
                  <TableCell style={{ color: "whitesmoke" }}>{player.balls}</TableCell>
                  <TableCell style={{ color: "whitesmoke" }}>{player.strikeRate.toFixed(2)}</TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={4} style={{ color: "#888", textAlign: "center" }}>
                    No players with 20+ balls faced yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <h4 style={{ marginTop: 24, marginBottom: 8 }}>Fixtures ({stage})</h4>
          <Table style={{ backgroundColor: "#171717" }}>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>Opponent</TableCell>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>Status</TableCell>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>Result</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teamFixtures.length > 0 ? teamFixtures.map((fixture) => (
                <TableRow key={`fixture-${fixture.index}`}>
                  <TableCell style={{ color: "whitesmoke" }}>{fixture.opponent}</TableCell>
                  <TableCell style={{ color: "whitesmoke" }}>{fixture.status}</TableCell>
                  <TableCell style={{ color: fixture.result === "-" ? "#aaa" : "#4CAF50" }}>{fixture.result}</TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={3} style={{ color: "#888", textAlign: "center" }}>
                    No fixtures for selected team in this stage
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default FixturesView;
