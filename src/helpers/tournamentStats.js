import { getPlayerName } from "./teamHelpers";

const createPlayerRecord = (name, team) => ({
  name,
  team,
  runs: 0,
  balls: 0,
  strikeRate: 0,
  wickets: 0,
  runsConceded: 0,
  ballsBowled: 0,
  economy: 0,
});

export const addMatchToPlayerStats = (playerStats = [], scoreData = {}) => {
  const records = playerStats.map((player) => ({
    ...createPlayerRecord(player.name, player.team),
    ...player,
  }));

  const getRecord = (player, team) => {
    const name = getPlayerName(player);
    let record = records.find(
      (candidate) => candidate.name === name && candidate.team === team
    );

    if (!record) {
      record = createPlayerRecord(name, team);
      records.push(record);
    }

    return record;
  };

  const addBatting = (side) => {
    const team = scoreData[side];
    const playingXI = scoreData[`${side}PlayingXI`] || [];
    const runsByPlayer = scoreData[`${side}Stats`] || {};
    const ballsByPlayer = scoreData[`${side}BallsFacedByPlayer`] || {};
    const playerIndexes = new Set([
      ...Object.keys(runsByPlayer),
      ...Object.keys(ballsByPlayer),
    ]);

    playerIndexes.forEach((playerIndex) => {
      const player = playingXI[Number(playerIndex)];
      if (!player || !team) return;

      const runs = Number(runsByPlayer[playerIndex]) || 0;
      const balls = Number(ballsByPlayer[playerIndex]) || 0;
      const record = getRecord(player, team);
      record.runs += runs;
      record.balls += balls;
      record.strikeRate =
        record.balls > 0 ? (record.runs / record.balls) * 100 : 0;
    });
  };

  const addBowling = (side) => {
    const team = scoreData[side];
    const playingXI = scoreData[`${side}PlayingXI`] || [];
    const bowlingStats = scoreData[`${side}BowlingStats`] || {};

    Object.keys(bowlingStats).forEach((playerIndex) => {
      const player = playingXI[Number(playerIndex)];
      const figures = bowlingStats[playerIndex];
      if (!player || !team || !figures) return;

      const record = getRecord(player, team);
      record.wickets += Number(figures.wickets) || 0;
      record.runsConceded += Number(figures.runs) || 0;
      record.ballsBowled += Number(figures.balls) || 0;
      record.economy =
        record.ballsBowled > 0
          ? (record.runsConceded * 6) / record.ballsBowled
          : 0;
    });
  };

  addBatting("team1");
  addBatting("team2");
  addBowling("team1");
  addBowling("team2");

  return records;
};
