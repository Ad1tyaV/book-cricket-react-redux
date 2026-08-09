import React from "react";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import { getPlayerName } from "../helpers/teamHelpers";
import BowlingScoreCard from "./BowlingScoreCard";

function ScoreCard(props) {
  const ppl = Array.from({ length: 11 }, (_, index) => index);

  // Safe access to track data with defaults
  const team1Track = props.track?.team1 || { player_1: -1, player_2: 0 };
  const team2Track = props.track?.team2 || { player_1: -1, player_2: 0 };
  const hasBowlingFigures =
    Object.keys(props.team1BowlingStats || {}).length > 0 ||
    Object.keys(props.team2BowlingStats || {}).length > 0;

  return (
    <div>
      <Table
        style={{ maxWidth: 500, maxHeight: 100, float: "left" }}
        aria-label="customized table"
        key={Date.now() + 1}
      >
        <TableBody>
          {ppl.map((index) => {
            const isOut = props.team1Dismissed?.includes(index);
            const isNotOut =
              !isOut &&
              (team1Track.player_1 === index || team1Track.player_2 === index);
            return (
              <TableRow key={`team1-${index}`}>
                <TableCell
                  style={{
                    color: isOut ? "red" : isNotOut ? "#72ff72" : "gray",
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
            const isOut = props.team2Dismissed?.includes(index);
            const isNotOut =
              !isOut &&
              (team2Track.player_1 === index || team2Track.player_2 === index);
            return (
              <TableRow key={`team2-${index}`}>
                <TableCell
                  style={{
                    color: isOut ? "red" : isNotOut ? "#72ff72" : "gray",
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

      {hasBowlingFigures && (
        <div style={{ clear: "both", paddingTop: 30 }}>
          <h3 style={{ textAlign: "center", color: "whitesmoke" }}>
            {props.team1} Bowling
          </h3>
          <BowlingScoreCard
            playingXI={props.team1PlayingXI}
            stats={props.team1BowlingStats}
            bowlingOrder={props.team1BowlingOrder}
          />
          <h3 style={{ textAlign: "center", color: "whitesmoke" }}>
            {props.team2} Bowling
          </h3>
          <BowlingScoreCard
            playingXI={props.team2PlayingXI}
            stats={props.team2BowlingStats}
            bowlingOrder={props.team2BowlingOrder}
          />
        </div>
      )}
    </div>
  );
}

export default ScoreCard;
