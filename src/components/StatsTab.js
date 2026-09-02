import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { formatOvers } from "../helpers/matchResultHelper";

function StatsTab({ playerStats = [] }) {
  // Filter players with at least 125 runs
  const eligiblePlayers = playerStats.filter((p) => p.runs >= 125);

  // Top 5 scorers
  const topScorers = [...eligiblePlayers]
    .sort((a, b) => b.runs - a.runs)
    .slice(0, 5);

  // Top 5 strikers (by strike rate)
  const topStrikers = [...eligiblePlayers]
    .sort((a, b) => b.strikeRate - a.strikeRate)
    .slice(0, 5);

  const getEconomy = (player) =>
    Number(player.ballsBowled) > 0
      ? (Number(player.runsConceded) * 6) / Number(player.ballsBowled)
      : 0;

  const topWicketTakers = playerStats
    .filter((player) => Number(player.wickets) >= 5)
    .sort((a, b) => {
      if (Number(b.wickets) !== Number(a.wickets)) {
        return Number(b.wickets) - Number(a.wickets);
      }
      return getEconomy(a) - getEconomy(b);
    })
    .slice(0, 5);

  const topEconomyBowlers = playerStats
    .filter((player) => Number(player.ballsBowled) >= 30)
    .sort((a, b) => {
      const economyDifference = getEconomy(a) - getEconomy(b);
      if (economyDifference !== 0) return economyDifference;
      return Number(b.wickets) - Number(a.wickets);
    })
    .slice(0, 5);

  return (
    <div style={{ padding: 20, color: "whitesmoke" }}>
      <h2 style={{ textAlign: "center" }}>Tournament Statistics</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <div style={{ minWidth: 400, margin: 10 }}>
          <h3 style={{ textAlign: "center" }}>Top 5 Run Scorers</h3>
          <Table style={{ backgroundColor: "#1e1e1e" }}>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>
                  Player
                </TableCell>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>
                  Team
                </TableCell>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>
                  Runs
                </TableCell>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>
                  Balls
                </TableCell>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>
                  SR
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topScorers.length > 0 ? (
                topScorers.map((player, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ color: "whitesmoke" }}>
                      {player.name}
                    </TableCell>
                    <TableCell style={{ color: "whitesmoke" }}>
                      {player.team}
                    </TableCell>
                    <TableCell style={{ color: "whitesmoke" }}>
                      {player.runs}
                    </TableCell>
                    <TableCell style={{ color: "whitesmoke" }}>
                      {player.balls}
                    </TableCell>
                    <TableCell style={{ color: "whitesmoke" }}>
                      {player.strikeRate.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    style={{ color: "#aaa", textAlign: "center" }}
                  >
                    No players with 125+ runs yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div style={{ minWidth: 400, margin: 10 }}>
          <h3 style={{ textAlign: "center" }}>
            Top 5 Strike Rates (min 125 runs)
          </h3>
          <Table style={{ backgroundColor: "#1e1e1e" }}>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>
                  Player
                </TableCell>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>
                  Team
                </TableCell>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>
                  Runs
                </TableCell>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>
                  Balls
                </TableCell>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>
                  SR
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topStrikers.length > 0 ? (
                topStrikers.map((player, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ color: "whitesmoke" }}>
                      {player.name}
                    </TableCell>
                    <TableCell style={{ color: "whitesmoke" }}>
                      {player.team}
                    </TableCell>
                    <TableCell style={{ color: "whitesmoke" }}>
                      {player.runs}
                    </TableCell>
                    <TableCell style={{ color: "whitesmoke" }}>
                      {player.balls}
                    </TableCell>
                    <TableCell style={{ color: "whitesmoke" }}>
                      {player.strikeRate.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    style={{ color: "#aaa", textAlign: "center" }}
                  >
                    No players with 125+ runs yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div style={{ minWidth: 400, margin: 10 }}>
          <h3 style={{ textAlign: "center" }}>
            Top 5 Wicket Takers (min 5 wickets)
          </h3>
          <Table style={{ backgroundColor: "#1e1e1e" }}>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>
                  Player
                </TableCell>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>
                  Team
                </TableCell>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>
                  Wkts
                </TableCell>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>
                  Overs
                </TableCell>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>
                  Econ
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topWicketTakers.length > 0 ? (
                topWicketTakers.map((player) => (
                  <TableRow key={`wickets-${player.team}-${player.name}`}>
                    <TableCell style={{ color: "whitesmoke" }}>
                      {player.name}
                    </TableCell>
                    <TableCell style={{ color: "whitesmoke" }}>
                      {player.team}
                    </TableCell>
                    <TableCell style={{ color: "whitesmoke" }}>
                      {player.wickets}
                    </TableCell>
                    <TableCell style={{ color: "whitesmoke" }}>
                      {formatOvers(player.ballsBowled)}
                    </TableCell>
                    <TableCell style={{ color: "whitesmoke" }}>
                      {getEconomy(player).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    style={{ color: "#aaa", textAlign: "center" }}
                  >
                    No bowlers with 5+ wickets yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div style={{ minWidth: 400, margin: 10 }}>
          <h3 style={{ textAlign: "center" }}>
            Top 5 Economy Rates (min 5 overs)
          </h3>
          <Table
            aria-label="economy leaderboard"
            style={{ backgroundColor: "#1e1e1e" }}
          >
            <TableHead>
              <TableRow>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>
                  Player
                </TableCell>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>
                  Team
                </TableCell>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>
                  Overs
                </TableCell>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>
                  Runs
                </TableCell>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>
                  Wkts
                </TableCell>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>
                  Econ
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topEconomyBowlers.length > 0 ? (
                topEconomyBowlers.map((player) => (
                  <TableRow key={`economy-${player.team}-${player.name}`}>
                    <TableCell style={{ color: "whitesmoke" }}>
                      {player.name}
                    </TableCell>
                    <TableCell style={{ color: "whitesmoke" }}>
                      {player.team}
                    </TableCell>
                    <TableCell style={{ color: "whitesmoke" }}>
                      {formatOvers(player.ballsBowled)}
                    </TableCell>
                    <TableCell style={{ color: "whitesmoke" }}>
                      {player.runsConceded}
                    </TableCell>
                    <TableCell style={{ color: "whitesmoke" }}>
                      {player.wickets || 0}
                    </TableCell>
                    <TableCell style={{ color: "whitesmoke" }}>
                      {getEconomy(player).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    style={{ color: "#aaa", textAlign: "center" }}
                  >
                    No bowlers with 5+ overs yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default StatsTab;
