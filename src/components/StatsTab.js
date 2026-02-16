import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";

function StatsTab({ playerStats }) {
  // Filter players with at least 125 runs
  const eligiblePlayers = playerStats.filter(p => p.runs >= 125);
  
  // Top 5 scorers
  const topScorers = [...eligiblePlayers]
    .sort((a, b) => b.runs - a.runs)
    .slice(0, 5);
  
  // Top 5 strikers (by strike rate)
  const topStrikers = [...eligiblePlayers]
    .sort((a, b) => b.strikeRate - a.strikeRate)
    .slice(0, 5);

  return (
    <div style={{ padding: 20, color: "whitesmoke" }}>
      <h2 style={{ textAlign: "center" }}>Tournament Statistics</h2>
      
      <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
        <div style={{ minWidth: 400, margin: 10 }}>
          <h3 style={{ textAlign: "center" }}>Top 5 Run Scorers</h3>
          <Table style={{ backgroundColor: "#1e1e1e" }}>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>Player</TableCell>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>Team</TableCell>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>Runs</TableCell>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>Balls</TableCell>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>SR</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topScorers.length > 0 ? topScorers.map((player, index) => (
                <TableRow key={index}>
                  <TableCell style={{ color: "whitesmoke" }}>{player.name}</TableCell>
                  <TableCell style={{ color: "whitesmoke" }}>{player.team}</TableCell>
                  <TableCell style={{ color: "whitesmoke" }}>{player.runs}</TableCell>
                  <TableCell style={{ color: "whitesmoke" }}>{player.balls}</TableCell>
                  <TableCell style={{ color: "whitesmoke" }}>{player.strikeRate.toFixed(2)}</TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={5} style={{ color: "#aaa", textAlign: "center" }}>
                    No players with 75+ runs yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div style={{ minWidth: 400, margin: 10 }}>
          <h3 style={{ textAlign: "center" }}>Top 5 Strike Rates (min 125 runs)</h3>
          <Table style={{ backgroundColor: "#1e1e1e" }}>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>Player</TableCell>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>Team</TableCell>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>Runs</TableCell>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>Balls</TableCell>
                <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>SR</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topStrikers.length > 0 ? topStrikers.map((player, index) => (
                <TableRow key={index}>
                  <TableCell style={{ color: "whitesmoke" }}>{player.name}</TableCell>
                  <TableCell style={{ color: "whitesmoke" }}>{player.team}</TableCell>
                  <TableCell style={{ color: "whitesmoke" }}>{player.runs}</TableCell>
                  <TableCell style={{ color: "whitesmoke" }}>{player.balls}</TableCell>
                  <TableCell style={{ color: "whitesmoke" }}>{player.strikeRate.toFixed(2)}</TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={5} style={{ color: "#aaa", textAlign: "center" }}>
                    No players with 125+ runs yet
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
