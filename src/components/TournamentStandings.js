import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";

function TournamentStandings({ standings, stage }) {
  const sortedStandings = [...standings].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return b.nrr - a.nrr;
  });

  // Group standings if groups exist
  const hasGroups = standings.some(t => t.group && t.group !== "ALL");
  
  const renderStandingsTable = (teamsList, title) => (
    <div style={{ marginBottom: 30 }}>
      {title && <h3 style={{ textAlign: "center", color: "whitesmoke" }}>{title}</h3>}
      <Table style={{ maxWidth: 800, margin: "0 auto", backgroundColor: "#1e1e1e" }}>
        <TableHead>
          <TableRow>
            <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>Pos</TableCell>
            <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>Team</TableCell>
            <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>Played</TableCell>
            <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>Won</TableCell>
            <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>Lost</TableCell>
            <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>NR</TableCell>
            <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>NRR</TableCell>
            <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teamsList.map((team, index) => (
            <TableRow key={team.name}>
              <TableCell style={{ color: "whitesmoke" }}>{index + 1}</TableCell>
              <TableCell style={{ color: "whitesmoke" }}>{team.name}</TableCell>
              <TableCell style={{ color: "whitesmoke" }}>{team.played}</TableCell>
              <TableCell style={{ color: "whitesmoke" }}>{team.won}</TableCell>
              <TableCell style={{ color: "whitesmoke" }}>{team.lost}</TableCell>
              <TableCell style={{ color: "whitesmoke" }}>{team.noResult || 0}</TableCell>
              <TableCell style={{ color: "whitesmoke" }}>{team.nrr.toFixed(3)}</TableCell>
              <TableCell style={{ color: "whitesmoke" }}>{team.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div style={{ padding: 20, color: "whitesmoke" }}>
      <h2 style={{ textAlign: "center" }}>{stage} Standings</h2>
      
      {hasGroups ? (
        <>
          {renderStandingsTable(
            sortedStandings.filter(t => t.group === "A"),
            "Group A"
          )}
          {renderStandingsTable(
            sortedStandings.filter(t => t.group === "B"),
            "Group B"
          )}
        </>
      ) : (
        renderStandingsTable(sortedStandings, null)
      )}
    </div>
  );
}

export default TournamentStandings;
