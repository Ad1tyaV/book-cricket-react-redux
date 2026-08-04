import React from "react";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import { getPlayerName } from "../helpers/teamHelpers";

function ScoreCard(props) {
  const ppl = Array.from({ length: 11 }, (_, index) => index);

  // Safe access to track data with defaults
  const team1Track = props.track?.team1 || { player_1: -1, player_2: 0 };
  const team2Track = props.track?.team2 || { player_1: -1, player_2: 0 };

  return (
    <div>
      <Table
        style={{ maxWidth: 500, maxHeight: 100, float: "left" }}
        aria-label="customized table"
        key={Date.now() + 1}
      >
        <TableBody>
          {ppl.map((index) => {
            return (
              <TableRow key={`team1-${index}`}>
                <TableCell
                  style={{
                    color:
                      team1Track.player_1 === index ||
                      team1Track.player_2 === index
                        ? "#72ff72"
                        : (index >
                            Math.min(
                              team1Track.player_1,
                              team1Track.player_2
                            ) &&
                            index <
                              Math.max(
                                team1Track.player_1,
                                team1Track.player_2
                              )) ||
                          index <
                            Math.min(team1Track.player_1, team1Track.player_2)
                        ? "red"
                        : "gray",
                  }}
                >
                  {getPlayerName(props.team1PlayingXI[index])}
                </TableCell>
                <TableCell style={{ color: "whitesmoke" }}>
                  {props.team1Stats[index] ?? 0} (
                  {props.team1BallsFacedByPlayer?.[index] ?? 0})
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Table
        style={{ maxWidth: 500, maxHeight: 100, float: "right" }}
        aria-label="customized table"
        key={Date.now()}
      >
        <TableBody>
          {ppl.map((index) => {
            return (
              <TableRow key={`team2-${index}`}>
                <TableCell
                  style={{
                    color:
                      team2Track.player_1 === index ||
                      team2Track.player_2 === index
                        ? "#72ff72"
                        : (index >
                            Math.min(
                              team2Track.player_1,
                              team2Track.player_2
                            ) &&
                            index <
                              Math.max(
                                team2Track.player_1,
                                team2Track.player_2
                              )) ||
                          index <
                            Math.min(team2Track.player_1, team2Track.player_2)
                        ? "red"
                        : "gray",
                  }}
                >
                  {getPlayerName(props.team2PlayingXI[index])}
                </TableCell>
                <TableCell style={{ color: "whitesmoke" }}>
                  {props.team2Stats[index] ?? 0} (
                  {props.team2BallsFacedByPlayer?.[index] ?? 0})
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default ScoreCard;
