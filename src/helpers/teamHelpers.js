const fallbackRating = (index, type) => {
  if (type === "batting") return Math.max(28, 86 - index * 5);
  return Math.min(88, 25 + index * 7);
};

export const normalizePlayer = (player, index = 0, teamName = "team") => {
  if (player && typeof player === "object" && player.name) {
    return {
      id: player.id || `${teamName}-${index}-${player.name}`,
      name: player.name,
      batting: Number(player.batting) || fallbackRating(index, "batting"),
      attacking:
        Number(player.attacking) ||
        Number(player.batting) ||
        fallbackRating(index, "batting"),
      bowling: Number(player.bowling) || fallbackRating(index, "bowling"),
      role: player.role || "Player",
    };
  }

  return {
    id: `${teamName}-${index}-${player || "player"}`,
    name: player || `Player ${index + 1}`,
    batting: fallbackRating(index, "batting"),
    attacking: fallbackRating(index, "batting"),
    bowling: fallbackRating(index, "bowling"),
    role: "Player",
  };
};

export const getSquadFormat = (format = "ODI_50") =>
  format === "T20" ? "T20" : "ODI";

export const isSquadCatalog = (teamData) =>
  Boolean(
    teamData &&
      teamData.schemaVersion === 1 &&
      teamData.players &&
      teamData.formats?.T20 &&
      teamData.formats?.ODI
  );

export const getSquad = (teamData, teamName, format = "ODI_50") => {
  if (isSquadCatalog(teamData)) {
    const formatSquads = teamData.formats[getSquadFormat(format)];
    const teamSelection = formatSquads?.[teamName];
    if (!teamSelection) return [];

    return [...teamSelection.defaultXI, ...teamSelection.reserves]
      .map((playerId, index) => {
        const player = teamData.players[playerId];
        return player
          ? normalizePlayer({ ...player, id: playerId }, index, teamName)
          : null;
      })
      .filter(Boolean);
  }

  const rawSquad = teamData?.[teamName];
  if (!rawSquad) return [];

  if (Array.isArray(rawSquad)) {
    return rawSquad.map((player, index) =>
      normalizePlayer(player, index, teamName)
    );
  }

  return Object.keys(rawSquad)
    .sort((a, b) => Number(a) - Number(b))
    .map((key, index) => normalizePlayer(rawSquad[key], index, teamName));
};

export const getDefaultXI = (teamData, teamName, format = "ODI_50") =>
  getSquad(teamData, teamName, format).slice(0, 11);

export const getPlayerName = (player) =>
  typeof player === "string" ? player : player?.name || "Player";

export const getBowlingStrength = (playingXI = []) => {
  const bestFive = playingXI
    .map((player) => Number(player?.bowling) || 0)
    .sort((a, b) => b - a)
    .slice(0, 5);

  if (bestFive.length === 0) return 70;
  return (
    bestFive.reduce((total, rating) => total + rating, 0) / bestFive.length
  );
};

export const getTeamStrengths = (playingXI = []) => {
  if (playingXI.length === 0) return { batting: 0, attacking: 0, bowling: 0 };
  const battingUnit = playingXI.filter(
    (player) =>
      player?.role === "Batter" ||
      player?.role === "Wicketkeeper" ||
      player?.role === "All-rounder" ||
      player?.role === "Player"
  );
  const ratedBatters = battingUnit.length > 0 ? battingUnit : playingXI;
  const batting =
    ratedBatters.reduce(
      (total, player) => total + (Number(player?.batting) || 0),
      0
    ) / ratedBatters.length;
  const attacking =
    ratedBatters.reduce(
      (total, player) => total + (Number(player?.attacking) || 0),
      0
    ) / ratedBatters.length;

  return {
    batting: Math.round(batting),
    attacking: Math.round(attacking),
    bowling: Math.round(getBowlingStrength(playingXI)),
  };
};
