import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { playOvers } from "../redux-setup/actions/scoreX";
import resetState from "../redux-setup/actions/resetState";
import setBatterMindset from "../redux-setup/actions/setBatterMindset";
import ScoreCard from "./ScoreCard";
import { Button, ButtonGroup } from "@material-ui/core";
import { getPlayerName } from "../helpers/teamHelpers";

const mindsetOptions = [
  {
    value: "defensive",
    label: "Defensive",
    color: "#74a9d8",
    title: "Lower risk, more dots and strike rotation",
  },
  {
    value: "default",
    label: "Default",
    color: "#8fded4",
    title: "Play to the batter's natural attributes",
  },
  {
    value: "aggressive",
    label: "Aggressive",
    color: "#e5a94d",
    title: "More attacking shots with some extra risk",
  },
];

function BatterAtCrease({
  player,
  index,
  runs,
  balls,
  mindset,
  onStrike,
  disabled,
  onMindsetChange,
}) {
  const playerName = getPlayerName(player);
  return (
    <div className={`batter-card ${onStrike ? "on-strike" : ""}`}>
      <div className="batter-summary">
        <div>
          <strong>
            {playerName} {onStrike ? "●" : ""}
          </strong>
          <small>{onStrike ? "On strike" : "Non-striker"}</small>
        </div>
        <span>
          {runs} <small>({balls})</small>
        </span>
      </div>
      <ButtonGroup
        fullWidth
        size="small"
        aria-label={`${playerName} batting mindset`}
      >
        {mindsetOptions.map((option) => {
          const selected = mindset === option.value;
          return (
            <Button
              key={option.value}
              variant={selected ? "contained" : "outlined"}
              disabled={disabled}
              title={option.title}
              aria-label={`Set ${playerName} to ${option.value}`}
              aria-pressed={selected}
              onClick={() => onMindsetChange(index, option.value)}
              style={{
                color: selected ? "#071216" : option.color,
                backgroundColor: selected ? option.color : "transparent",
                borderColor: `${option.color}88`,
                fontSize: 11,
              }}
            >
              {option.label}
            </Button>
          );
        })}
      </ButtonGroup>
    </div>
  );
}

function MatchComponent(props) {
  const [message, setMessage] = useState("");
  const track = useRef({});
  const runRate = (runs, balls) =>
    balls > 0 ? ((runs / balls) * 6).toFixed(2) : "0.00";
  const team1Batting =
    props.scoreData.currentTeamBatting === props.scoreData.team1;
  const battingSide = team1Batting ? "team1" : "team2";
  const battingTeam = props.scoreData[battingSide];
  const playingXI = props.scoreData[`${battingSide}PlayingXI`];
  const stats = props.scoreData[`${battingSide}Stats`];
  const ballsByPlayer = props.scoreData[`${battingSide}BallsFacedByPlayer`];
  const mindsets = props.scoreData[`${battingSide}Mindsets`];
  const batterIndexes = [
    props.scoreData.onStrike.batterIndex,
    props.scoreData.offStrike.batterIndex,
  ];

  useEffect(() => {
    if (props.scoreData.gameover) {
      track.current = {
        team1: props.scoreData.team1LastPair,
        team2: props.scoreData.team2LastPair,
      };
      if (props.scoreData.team2Total > props.scoreData.team1Total) {
        setMessage(
          `${props.scoreData.team2} won by ${
            10 - props.scoreData.team2Wickets
          } wickets`
        );
      } else if (props.scoreData.team2Total === props.scoreData.team1Total) {
        setMessage(`Match Tied`);
      } else {
        setMessage(
          `${props.scoreData.team1} beat ${props.scoreData.team2} by ${
            props.scoreData.team1Total - props.scoreData.team2Total
          } runs`
        );
      }
    }
  }, [props.scoreData]);

  return (
    <div style={{ color: "whitesmoke" }}>
      <div className="scoreboard-grid">
        <div className="score-panel">
          <div className="team-name">{props.scoreData.team1}</div>
          <h3>
            {props.scoreData.team1Total}/{props.scoreData.team1Wickets}
          </h3>
          <small>
            {Math.floor(props.scoreData.team1BallsFaced / 6)}.
            {props.scoreData.team1BallsFaced % 6} overs · RR{" "}
            {runRate(
              props.scoreData.team1Total,
              props.scoreData.team1BallsFaced
            )}
          </small>
        </div>
        <div className="score-panel">
          <div className="team-name">{props.scoreData.team2}</div>
          <h3>
            {props.scoreData.team2Total}/{props.scoreData.team2Wickets}
          </h3>
          <small>
            {Math.floor(props.scoreData.team2BallsFaced / 6)}.
            {props.scoreData.team2BallsFaced % 6} overs · RR{" "}
            {runRate(
              props.scoreData.team2Total,
              props.scoreData.team2BallsFaced
            )}
          </small>
        </div>
      </div>
      <div className="action-bar">
        <div className="crease-header">
          <strong>{battingTeam} at the crease</strong>
          <small>Batters gradually settle over their first 30 balls.</small>
        </div>
        <div className="crease-grid">
          {batterIndexes.map((index, position) => (
            <BatterAtCrease
              key={`${battingSide}-${index}`}
              player={playingXI[index]}
              index={index}
              runs={stats[index] || 0}
              balls={ballsByPlayer[index] || 0}
              mindset={mindsets[index] || "default"}
              onStrike={position === 0}
              disabled={props.scoreData.gameover}
              onMindsetChange={(batterIndex, mindset) =>
                props.setMindsetDispatch(battingTeam, batterIndex, mindset)
              }
            />
          ))}
        </div>
        <hr style={{ borderColor: "rgba(151, 190, 199, 0.16)" }} />
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
                  track.current = {};
                  props.resetDispatch();
                }}
              >
                Play Again
              </Button>
            </span>
          </>
        ) : (
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            {[1, 5, 10].map((overs) => (
              <Button
                key={overs}
                color="primary"
                variant="contained"
                onClick={() => props.playOversDispatch(overs, props.pitchType)}
              >
                Autoplay {overs} {overs === 1 ? "over" : "overs"}
              </Button>
            ))}
          </span>
        )}
        {!props.scoreData.gameover && (
          <small
            style={{
              display: "block",
              marginTop: 10,
              color: "#91a5ad",
              textAlign: "center",
            }}
          >
            Autoplay pauses when a wicket falls so you can set the new
            batter&apos;s mindset.
          </small>
        )}
      </div>

      {props.scoreData.gameover ? (
        <ScoreCard
          track={track.current}
          team1={props.scoreData.team1}
          team2={props.scoreData.team2}
          teamData={props.teamData}
          team1Stats={props.scoreData.team1Stats}
          team2Stats={props.scoreData.team2Stats}
          team1BallsFacedByPlayer={props.scoreData.team1BallsFacedByPlayer}
          team2BallsFacedByPlayer={props.scoreData.team2BallsFacedByPlayer}
          team1PlayingXI={props.scoreData.team1PlayingXI}
          team2PlayingXI={props.scoreData.team2PlayingXI}
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
    playOversDispatch: (overs, pitch) => dispatch(playOvers(overs, pitch)),
    setMindsetDispatch: (team, batterIndex, mindset) =>
      dispatch(setBatterMindset(team, batterIndex, mindset)),
    resetDispatch: () => dispatch(resetState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MatchComponent);
