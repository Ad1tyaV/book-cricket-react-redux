const getBowlingRating = (player) => Number(player?.bowling) || 0;

export const getMaxOversPerBowler = (inningsOvers = 20) =>
  Math.max(1, Math.ceil((Number(inningsOvers) || 20) / 5));

export const getFrontlineBowlerIndexes = (playingXI = []) =>
  playingXI
    .map((player, playerIndex) => ({
      playerIndex,
      bowlingRating: getBowlingRating(player),
    }))
    .sort((a, b) => {
      if (b.bowlingRating !== a.bowlingRating) {
        return b.bowlingRating - a.bowlingRating;
      }
      return a.playerIndex - b.playerIndex;
    })
    .slice(0, Math.min(5, playingXI.length))
    .map(({ playerIndex }) => playerIndex);

export const selectNextBowlerIndex = ({
  playingXI = [],
  bowlingStats = {},
  previousBowlerIndex = null,
  inningsOvers = 20,
}) => {
  const maxBalls = getMaxOversPerBowler(inningsOvers) * 6;
  const frontlineIndexes = getFrontlineBowlerIndexes(playingXI);
  const allIndexes = playingXI.map((_, playerIndex) => playerIndex);

  const getEligible = (indexes) =>
    indexes.filter((playerIndex) => {
      const ballsBowled = Number(bowlingStats[playerIndex]?.balls) || 0;
      return playerIndex !== previousBowlerIndex && ballsBowled < maxBalls;
    });

  // A sixth bowler is only used as a safety valve if the selected five cannot
  // legally complete the next over.
  const eligible = getEligible(frontlineIndexes);
  const candidates = eligible.length > 0 ? eligible : getEligible(allIndexes);

  if (candidates.length === 0) return null;

  return [...candidates].sort((a, b) => {
    const aBalls = Number(bowlingStats[a]?.balls) || 0;
    const bBalls = Number(bowlingStats[b]?.balls) || 0;
    if (aBalls !== bBalls) return aBalls - bBalls;

    const ratingDifference =
      getBowlingRating(playingXI[b]) - getBowlingRating(playingXI[a]);
    if (ratingDifference !== 0) return ratingDifference;

    return a - b;
  })[0];
};
