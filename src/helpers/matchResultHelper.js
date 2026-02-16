export const getMatchResult = (scoreData) => {
  const { team1, team2, team1Total, team2Total, team1Wickets, team2Wickets } = scoreData;
  
  if (team2Total > team1Total) {
    // Team 2 won
    const wicketsRemaining = 10 - team2Wickets;
    return `${team2} won by ${wicketsRemaining} wicket${wicketsRemaining !== 1 ? 's' : ''}`;
  } else if (team1Total > team2Total) {
    // Team 1 won
    const runMargin = team1Total - team2Total;
    return `${team1} won by ${runMargin} run${runMargin !== 1 ? 's' : ''}`;
  } else {
    // Match tied - use wickets as tie-breaker
    if (team1Wickets < team2Wickets) {
      return `${team1} won (tied on runs, fewer wickets lost: ${team1Wickets} vs ${team2Wickets})`;
    } else if (team2Wickets < team1Wickets) {
      return `${team2} won (tied on runs, fewer wickets lost: ${team2Wickets} vs ${team1Wickets})`;
    } else {
      return "Match Tied (same runs and wickets)";
    }
  }
};

export const getMatchWinner = (scoreData) => {
  const { team1, team2, team1Total, team2Total, team1Wickets, team2Wickets } = scoreData;
  
  if (team2Total > team1Total) {
    return team2;
  } else if (team1Total > team2Total) {
    return team1;
  } else {
    // Tie - use wickets as tie-breaker
    if (team1Wickets < team2Wickets) {
      return team1;
    } else if (team2Wickets < team1Wickets) {
      return team2;
    } else {
      return null; // True tie
    }
  }
};
