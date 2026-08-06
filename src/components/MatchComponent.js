import React from "react";
import { connect } from "react-redux";
import { playOvers } from "../redux-setup/actions/scoreX";
import resetState from "../redux-setup/actions/resetState";
import ScoreCard from "./ScoreCard";
import { Button } from "@material-ui/core";
import { getPlayerName } from "../helpers/teamHelpers";

function MatchComponent(props) {
  const message =
    !props.scoreData.gameover
      ? ""
      : props.scoreData.team2Total > props.scoreData.team1Total
      ? `${props.scoreData.team2} won by ${
          10 - props.scoreData.team2Wickets
        } wickets`
      : props.scoreData.team2Total === props.scoreData.team1Total
      ? "Match Tied"
      : `${props.scoreData.team1} beat ${props.scoreData.team2} by ${
          props.scoreData.team1Total - props.scoreData.team2Total
        } runs`;

  return (
    <div style={{ color: "whitesmoke" }}>
      {
        <>
          <span
            className="score_data"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <h3>{props.scoreData.team1}</h3>&nbsp;&nbsp;
            <h3>
              {props.scoreData.team1Total}/{props.scoreData.team1Wickets} Overs:
              {Math.floor(props.scoreData.team1BallsFaced / 6)}.
              {props.scoreData.team1BallsFaced % 6} RR:
              {(
                props.scoreData.team1Total /
                ((props.scoreData.team1BallsFaced || 1) / 6)
              ).toPrecision(3) ?? 0}
            </h3>
          </span>

          <span
            className="score_data"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <h3>{props.scoreData.team2}</h3>&nbsp;&nbsp;
            <h3>
              {props.scoreData.team2Total}/{props.scoreData.team2Wickets} Overs:
              {Math.floor(props.scoreData.team2BallsFaced / 6)}.
              {props.scoreData.team2BallsFaced % 6} RR:
              {(
                props.scoreData.team2Total /
                ((props.scoreData.team2BallsFaced || 1) / 6)
              ).toPrecision(3) ?? 0}
            </h3>
          </span>
        </>
      }
      {<br />}
      {props.scoreData.currentTeamBatting === props.scoreData.team1 ? (
        <div>
          <span style={{ display: "flex", justifyContent: "center" }}>
            {getPlayerName(
              props.scoreData.team1PlayingXI[
                props.scoreData.onStrike.batterIndex
              ]
            )}
            👉🏾
            {props.scoreData.team1Stats[props.scoreData.onStrike.batterIndex] ??
              0}
            (
            {props.scoreData.team1BallsFacedByPlayer?.[
              props.scoreData.onStrike.batterIndex
            ] ?? 0}
            )
          </span>
          <br />
          <span style={{ display: "flex", justifyContent: "center" }}>
            {getPlayerName(
              props.scoreData.team1PlayingXI[
                props.scoreData.offStrike.batterIndex
              ]
            )}
            👉🏾
            {props.scoreData.team1Stats[
              props.scoreData.offStrike.batterIndex
            ] ?? 0}
            (
            {props.scoreData.team1BallsFacedByPlayer?.[
              props.scoreData.offStrike.batterIndex
            ] ?? 0}
            )
          </span>
        </div>
      ) : (
        <div>
          <span style={{ display: "flex", justifyContent: "center" }}>
            {getPlayerName(
              props.scoreData.team2PlayingXI[
                props.scoreData.onStrike.batterIndex
              ]
            )}
            👉🏾
            {props.scoreData.team2Stats[props.scoreData.onStrike.batterIndex] ??
              0}
            (
            {props.scoreData.team2BallsFacedByPlayer?.[
              props.scoreData.onStrike.batterIndex
            ] ?? 0}
            )
          </span>
          <br />
          <span style={{ display: "flex", justifyContent: "center" }}>
            {getPlayerName(
              props.scoreData.team2PlayingXI[
                props.scoreData.offStrike.batterIndex
              ]
            )}
            👉🏾
            {props.scoreData.team2Stats[
              props.scoreData.offStrike.batterIndex
            ] ?? 0}
            (
            {props.scoreData.team2BallsFacedByPlayer?.[
              props.scoreData.offStrike.batterIndex
            ] ?? 0}
            )
          </span>
        </div>
      )}
      {<hr />}
      {props.scoreData.gameover ? (
        <>
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              fontWeight: "600",
            }}
          >
            {message}
          </span>
          <br />
          <span style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                props.resetDispatch();
              }}
            >
              Play Again
            </Button>
          </span>
        </>
      ) : (
        <span style={{ display: "flex", justifyContent: "center" }}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => props.playOverDispatch(props.pitchType)}
          >
            PLAY
          </Button>
        </span>
      )}

      {props.scoreData.gameover ? (
        <ScoreCard
          track={{
            team1: props.scoreData.team1LastPair,
            team2: props.scoreData.team2LastPair,
          }}
          team1={props.scoreData.team1}
          team2={props.scoreData.team2}
          team1PlayingXI={props.scoreData.team1PlayingXI}
          team2PlayingXI={props.scoreData.team2PlayingXI}
          team1Stats={props.scoreData.team1Stats}
          team2Stats={props.scoreData.team2Stats}
          team1BallsFacedByPlayer={props.scoreData.team1BallsFacedByPlayer}
          team2BallsFacedByPlayer={props.scoreData.team2BallsFacedByPlayer}
          team1Dismissed={props.scoreData.team1Dismissed}
          team2Dismissed={props.scoreData.team2Dismissed}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  //console.log(state);
  return {
    scoreData: state.manageScores,
    teamData: state.getTeams,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    playOverDispatch: (pitch) => dispatch(playOvers(1, pitch)),
    resetDispatch: () => dispatch(resetState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MatchComponent);
