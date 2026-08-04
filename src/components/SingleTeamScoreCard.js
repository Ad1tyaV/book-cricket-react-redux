import React from "react";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import {
  getDefaultXI,
  getPlayerName,
} from "../helpers/teamHelpers";

function SingleTeamScoreCard({
  team,
  teamData,
  format = "ODI_50",
  playingXI,
  stats,
  ballsFaced,
  track,
}) {
  const ppl = Array.from({ length: 11 }, (_, index) => index);
  const orderedXI = playingXI?.length
    ? playingXI
    : getDefaultXI(teamData, team, format);

  // Safe access to track data with defaults
  const teamTrack = track || { player_1: 0, player_2: 1 };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Table
        style={{ maxWidth: 600, backgroundColor: "#1e1e1e" }}
        aria-label="team scorecard"
      >
        <TableHead>
          <TableRow>
            <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>
              Player
            </TableCell>
            <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>
              Runs (Balls)
            </TableCell>
            <TableCell style={{ color: "whitesmoke", fontWeight: "bold" }}>
              SR
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ppl.map((index) => {
            const runs = stats[index] ?? 0;
            const balls = ballsFaced?.[index] ?? 0;
            const strikeRate =
              balls > 0 ? ((runs / balls) * 100).toFixed(2) : "0.00";

            const isNotOut =
              teamTrack.player_1 === index || teamTrack.player_2 === index;
            const isOut =
              (index > Math.min(teamTrack.player_1, teamTrack.player_2) &&
                index < Math.max(teamTrack.player_1, teamTrack.player_2)) ||
              index < Math.min(teamTrack.player_1, teamTrack.player_2);

            return (
              <TableRow key={`player-${index}`}>
                <TableCell
                  style={{
                    color: isNotOut ? "#72ff72" : isOut ? "red" : "gray",
                  }}
                >
                  {getPlayerName(orderedXI[index])}
                  {isNotOut && " *"}
                </TableCell>
                <TableCell style={{ color: "whitesmoke" }}>
                  {runs} ({balls})
                </TableCell>
                <TableCell style={{ color: "whitesmoke" }}>
                  {strikeRate}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default SingleTeamScoreCard;
