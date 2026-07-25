import { getPlayerName } from "./teamHelpers";

export const mergeInningsBattingStats = (
  existingStats,
  team,
  playingXI,
  runsByPlayer,
  ballsByPlayer
) => {
  const next = existingStats.map((player) => ({ ...player }));

  playingXI.forEach((player, index) => {
    const runs = runsByPlayer?.[index] || 0;
    const balls = ballsByPlayer?.[index] || 0;
    if (balls === 0) return;

    const name = getPlayerName(player);
    const current = next.find(
      (entry) => entry.name === name && entry.team === team
    );

    if (current) {
      current.runs += runs;
      current.balls += balls;
      current.innings += 1;
      current.strikeRate =
        current.balls > 0 ? (current.runs / current.balls) * 100 : 0;
    } else {
      next.push({
        name,
        team,
        runs,
        balls,
        innings: 1,
        strikeRate: balls > 0 ? (runs / balls) * 100 : 0,
      });
    }
  });

  return next;
};
