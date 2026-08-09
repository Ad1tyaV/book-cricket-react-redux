import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { getPlayerName } from "../helpers/teamHelpers";
import { formatOvers } from "../helpers/matchResultHelper";

function BowlingScoreCard({ playingXI = [], stats = {}, bowlingOrder = [] }) {
  const orderedIndexes = [
    ...new Set([...bowlingOrder, ...Object.keys(stats).map(Number)]),
  ].filter((playerIndex) => Number(stats[playerIndex]?.balls) > 0);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Table
        style={{ maxWidth: 600, backgroundColor: "#1e1e1e" }}
        aria-label="bowling scorecard"
      >
        <TableHead>
          <TableRow>
            <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>
              Bowler
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
          {orderedIndexes.map((playerIndex) => {
            const figures = stats[playerIndex];
            const economy =
              figures.balls > 0 ? (figures.runs * 6) / figures.balls : 0;

            return (
              <TableRow key={`bowler-${playerIndex}`}>
                <TableCell style={{ color: "whitesmoke" }}>
                  {getPlayerName(playingXI[playerIndex])}
                </TableCell>
                <TableCell style={{ color: "whitesmoke" }}>
                  {formatOvers(figures.balls)}
                </TableCell>
                <TableCell style={{ color: "whitesmoke" }}>
                  {figures.runs}
                </TableCell>
                <TableCell style={{ color: "whitesmoke" }}>
                  {figures.wickets}
                </TableCell>
                <TableCell style={{ color: "whitesmoke" }}>
                  {economy.toFixed(2)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default BowlingScoreCard;
