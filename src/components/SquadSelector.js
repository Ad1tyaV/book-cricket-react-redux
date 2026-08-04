import React, { useEffect, useMemo, useState } from "react";
import { Button, IconButton, Paper, Radio, Tooltip } from "@material-ui/core";
import {
  ArrowDownward,
  ArrowUpward,
  CompareArrows,
  Edit,
  Shuffle,
} from "@material-ui/icons";
import {
  getDefaultXI,
  getSquad,
  getTeamStrengths,
} from "../helpers/teamHelpers";

const shuffle = (players) => {
  const next = [...players];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
};

function SquadSelector({
  team,
  teamData,
  format = "ODI_50",
  value,
  onChange,
  compact = false,
}) {
  const squad = useMemo(
    () => getSquad(teamData, team, format),
    [teamData, team, format]
  );
  const [selected, setSelected] = useState(
    value?.length ? value : getDefaultXI(teamData, team, format)
  );
  const [expanded, setExpanded] = useState(false);
  const [selectedXIPlayerId, setSelectedXIPlayerId] = useState("");
  const [selectedReserveId, setSelectedReserveId] = useState("");

  useEffect(() => {
    const defaultXI = getDefaultXI(teamData, team, format);
    setSelected(defaultXI);
    setSelectedXIPlayerId("");
    setSelectedReserveId("");
    setExpanded(false);
    onChange(defaultXI);
    // onChange is intentionally omitted: parent render callbacks should not
    // reset a carefully arranged batting order.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [team, teamData, format]);

  const update = (next) => {
    setSelected(next);
    onChange(next);
  };

  const move = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= selected.length) return;
    const next = [...selected];
    [next[index], next[target]] = [next[target], next[index]];
    update(next);
  };

  const swapPlayers = () => {
    const selectedIndex = selected.findIndex(
      (player) => player.id === selectedXIPlayerId
    );
    const reserve = squad.find((player) => player.id === selectedReserveId);
    if (selectedIndex < 0 || !reserve) return;

    const next = [...selected];
    next[selectedIndex] = reserve;
    update(next);
    setSelectedXIPlayerId("");
    setSelectedReserveId("");
  };

  const selectedIds = new Set(selected.map((player) => player.id));
  const reserves = squad.filter((player) => !selectedIds.has(player.id));
  const strengths = getTeamStrengths(selected);
  const outgoingPlayer = selected.find(
    (player) => player.id === selectedXIPlayerId
  );
  const incomingPlayer = reserves.find(
    (player) => player.id === selectedReserveId
  );

  return (
    <div style={{ minWidth: compact ? 300 : 360, flex: "1 1 360px" }}>
      <Button
        fullWidth
        variant={expanded ? "contained" : "outlined"}
        color="primary"
        onClick={() => setExpanded((open) => !open)}
        startIcon={<Edit />}
        aria-expanded={expanded}
      >
        {expanded ? `Done editing ${team}` : `Change ${team} XI`}
      </Button>
      {!expanded && (
        <div
          style={{
            marginTop: 8,
            color: "#9fb1b9",
            fontSize: 13,
            textAlign: "center",
          }}
        >
          Default XI · BAT {strengths.batting} · ATK {strengths.attacking} ·
          BOWL {strengths.bowling}
        </div>
      )}

      {expanded && (
        <Paper
          style={{
            marginTop: 10,
            padding: compact ? 12 : 16,
            background: "#1e2733",
            color: "whitesmoke",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div>
              <strong>{team} Playing XI</strong>
              <div style={{ color: "#8ee58e" }}>
                BAT {strengths.batting} · ATK {strengths.attacking} · BOWL{" "}
                {strengths.bowling}
              </div>
            </div>
            <Tooltip title="Shuffle batting order">
              <Button
                size="small"
                variant="outlined"
                onClick={() => update(shuffle(selected))}
                style={{ color: "whitesmoke", borderColor: "#77808a" }}
                startIcon={<Shuffle />}
              >
                Shuffle
              </Button>
            </Tooltip>
          </div>

          <p style={{ color: "#9fb1b9", fontSize: 12, marginBottom: 6 }}>
            Select one player from the XI and one reserve, then swap. Use the
            arrows to set the batting order.
          </p>

          <div>
            {selected.map((player, index) => (
              <div
                key={player.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "34px 24px 1fr auto auto",
                  alignItems: "center",
                  gap: 3,
                  minHeight: 38,
                  borderBottom: "1px solid #34404d",
                  background:
                    player.id === selectedXIPlayerId
                      ? "rgba(54, 199, 181, 0.1)"
                      : "transparent",
                }}
              >
                <Radio
                  size="small"
                  checked={player.id === selectedXIPlayerId}
                  onChange={() => setSelectedXIPlayerId(player.id)}
                  inputProps={{
                    "aria-label": `Select ${player.name} to swap out`,
                  }}
                  style={{ color: "#36c7b5" }}
                />
                <span style={{ color: "#9eabb8" }}>{index + 1}</span>
                <span>
                  {player.name}{" "}
                  <small style={{ color: "#aab4bf" }}>
                    BAT {player.batting} · ATK {player.attacking} · BOWL{" "}
                    {player.bowling}
                  </small>
                </span>
                <IconButton
                  size="small"
                  aria-label={`Move ${player.name} up`}
                  disabled={index === 0}
                  onClick={() => move(index, -1)}
                  style={{ color: "whitesmoke" }}
                >
                  <ArrowUpward fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  aria-label={`Move ${player.name} down`}
                  disabled={index === selected.length - 1}
                  onClick={() => move(index, 1)}
                  style={{ color: "whitesmoke" }}
                >
                  <ArrowDownward fontSize="small" />
                </IconButton>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 14 }}>
            <strong>Reserves</strong>
            {reserves.map((player) => (
              <label
                key={player.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "34px 1fr",
                  alignItems: "center",
                  minHeight: 38,
                  cursor: "pointer",
                  color: "#c8d0d8",
                  background:
                    player.id === selectedReserveId
                      ? "rgba(218, 157, 57, 0.1)"
                      : "transparent",
                }}
              >
                <Radio
                  size="small"
                  checked={player.id === selectedReserveId}
                  onChange={() => setSelectedReserveId(player.id)}
                  inputProps={{
                    "aria-label": `Select ${player.name} to bring into the XI`,
                  }}
                  style={{ color: "#da9d39" }}
                />
                <span>
                  {player.name}{" "}
                  <small>
                    {player.role} · BAT {player.batting} · ATK{" "}
                    {player.attacking} · BOWL {player.bowling}
                  </small>
                </span>
              </label>
            ))}
          </div>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={!outgoingPlayer || !incomingPlayer}
            onClick={swapPlayers}
            startIcon={<CompareArrows />}
            style={{ marginTop: 12 }}
          >
            {outgoingPlayer && incomingPlayer
              ? `Swap ${outgoingPlayer.name} for ${incomingPlayer.name}`
              : "Select two players to swap"}
          </Button>
        </Paper>
      )}
    </div>
  );
}

export default SquadSelector;
