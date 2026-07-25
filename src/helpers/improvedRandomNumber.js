// Realistic cricket scoring system that adapts to different formats
const OUTCOMES = [-1, 0, 1, 2, 3, 4, 6]; // Possible cricket outcomes

// Realistic base frequencies for different formats
// These are calibrated to produce realistic run rates
const FORMAT_BASE_FREQUENCIES = {
  T20: {
    // T20: Target ~8-9 runs per over (realistic T20 average)
    AGGRESSIVE: [5, 45, 30, 15, 2, 18, 12], // ~9.2 RPO
    ANCHOR: [4, 55, 40, 18, 3, 15, 8], // ~7.8 RPO
    POWER_HITTER: [8, 40, 20, 10, 1, 20, 18], // ~10.5 RPO
    LOWER_ORDER_HITTER: [10, 42, 22, 10, 1, 20, 18],
    ACCUMULATOR: [3, 50, 50, 20, 4, 12, 6], // ~7.5 RPO
    ALL_ROUNDER: [5, 50, 35, 15, 2, 16, 10], // ~8.5 RPO
    TAIL_ENDER: [15, 70, 25, 8, 1, 8, 3], // ~5.2 RPO
  },
  ODI_50: {
    // Conservative base rates leave room for ability and late-innings intent.
    AGGRESSIVE: [6, 92, 56, 13, 2, 11, 3],
    ANCHOR: [5, 100, 66, 12, 2, 8, 1],
    POWER_HITTER: [10, 80, 42, 11, 1, 15, 6],
    LOWER_ORDER_HITTER: [12, 82, 44, 11, 1, 13, 4],
    ACCUMULATOR: [4, 94, 70, 15, 3, 7, 1],
    ALL_ROUNDER: [6, 94, 58, 14, 2, 9, 2],
    TAIL_ENDER: [16, 106, 38, 8, 1, 5, 1],
  },
  ODI_40: {
    // Slightly quicker than a 50-over innings, without T20-level hitting.
    AGGRESSIVE: [6, 84, 54, 13, 2, 13, 4],
    ANCHOR: [5, 92, 64, 13, 2, 9, 2],
    POWER_HITTER: [10, 75, 40, 11, 1, 16, 7],
    LOWER_ORDER_HITTER: [12, 76, 42, 11, 1, 14, 5],
    ACCUMULATOR: [4, 87, 66, 15, 3, 8, 2],
    ALL_ROUNDER: [6, 86, 56, 14, 2, 10, 3],
    TAIL_ENDER: [16, 100, 37, 8, 1, 6, 1],
  },
};

// Format-specific modifiers
const FORMAT_MODIFIERS = {
  T20: {
    name: "T20",
    totalOvers: 20,
    aggressionMultiplier: 1.5, // More aggressive
    boundaryBoost: 1.4, // More 4s and 6s
    dotPenalty: 0.7, // Fewer dot balls
    wicketRisk: 1.3, // Higher risk of getting out
  },
  ODI_50: {
    name: "50 Over ODI",
    totalOvers: 50,
    aggressionMultiplier: 1.0, // Balanced
    boundaryBoost: 1.0,
    dotPenalty: 1.0,
    wicketRisk: 1.0,
  },
  ODI_40: {
    name: "40 Over ODI",
    totalOvers: 40,
    aggressionMultiplier: 1.2, // Slightly more aggressive
    boundaryBoost: 1.15,
    dotPenalty: 0.85,
    wicketRisk: 1.1,
  },
  TEST: {
    name: "Test Match",
    totalOvers: 90, // Typical day's play
    aggressionMultiplier: 0.6, // Very conservative
    boundaryBoost: 0.7,
    dotPenalty: 1.4, // More dot balls acceptable
    wicketRisk: 0.7, // Lower risk tolerance
  },
};

// Pitch condition modifiers - adjusted difficulties
const PITCH_MODIFIERS = {
  NORMAL: { wicket: 0, dot: 0, single: 0, two: 0, three: 0, four: 0, six: 0 },
  GREEN: {
    wicket: 1,
    dot: 2,
    single: 2,
    two: 1,
    three: 0,
    four: -1,
    six: -1,
  },
  HARD: { wicket: -2, dot: -6, single: -2, two: 1, three: 0, four: 4, six: 5 }, // Difficulty 2
  WET: {
    wicket: 0,
    dot: 3,
    single: 3,
    two: 2,
    three: 0,
    four: -1,
    six: -2,
  },
  // Dusty stays distinct from Normal: more attritional, fewer boundaries.
  DUSTY: {
    wicket: 2,
    dot: 8,
    single: -2,
    two: -1,
    three: 0,
    four: -2,
    six: -3,
  },
};

const FORMAT_PITCH_TUNING = {};

const EXPECTED_RUN_RATE = {
  T20: 8.6,
  ODI_40: 5.8,
  ODI_50: 5.4,
  TEST: 3.4,
};

const applyFrequencyDelta = (frequency, delta) => {
  frequency[0] += delta.wicket || 0;
  frequency[1] += delta.dot || 0;
  frequency[2] += delta.single || 0;
  frequency[3] += delta.two || 0;
  frequency[4] += delta.three || 0;
  frequency[5] += delta.four || 0;
  frequency[6] += delta.six || 0;
};

const applyConsistencyAdjustments = (frequency, format, gameState = {}) => {
  const ballsFaced = gameState.ballsFaced || 0;
  const currentScore = gameState.currentScore || 0;
  const wicketsLost = gameState.wicketsLost || 0;
  const targetScore = gameState.targetScore || null;
  const batterIndex = gameState.batterIndex ?? -1;
  const totalBalls = FORMAT_MODIFIERS[format]?.totalOvers * 6 || 300;
  const isLowerOrder = batterIndex >= 5;
  const isTail = batterIndex >= 7;

  if (ballsFaced <= 0) return frequency;

  const progress = ballsFaced / totalBalls;
  const currentRunRate = currentScore / (ballsFaced / 6);
  const expectedRate = EXPECTED_RUN_RATE[format] || EXPECTED_RUN_RATE.ODI_50;

  // Prevent dramatic collapses too early/often.
  if (wicketsLost >= 5 && progress < 0.8) {
    if (isTail) {
      applyFrequencyDelta(frequency, {
        wicket: 1,
        dot: 1,
        single: 1,
        two: 0,
        four: 0,
        six: 0,
      });
    } else if (isLowerOrder) {
      applyFrequencyDelta(frequency, {
        wicket: -1,
        dot: -1,
        single: 2,
        two: 1,
        four: 1,
        six: 0,
      });
    } else {
      applyFrequencyDelta(frequency, {
        wicket: -4,
        dot: -3,
        single: 4,
        two: 1,
        four: 1,
        six: 0,
      });
    }
  }

  // Pull down unrealistic hitting streaks to avoid excessive totals.
  if (currentRunRate > expectedRate + 1.8 && progress < 0.9) {
    applyFrequencyDelta(frequency, {
      wicket: 1,
      dot: 4,
      single: 2,
      two: 0,
      four: -3,
      six: -4,
    });
  }

  // Lift unrealistically low-scoring phases if wickets are still in hand.
  if (
    currentRunRate < expectedRate - 1.8 &&
    wicketsLost <= 7 &&
    progress > 0.2
  ) {
    applyFrequencyDelta(frequency, {
      wicket: -2,
      dot: -4,
      single: 4,
      two: 2,
      four: 1,
      six: 0,
    });
  }

  // Chasing logic: reduce boom-bust behavior when required rate is manageable.
  if (targetScore) {
    const runsNeeded = targetScore - currentScore;
    const ballsRemaining = Math.max(1, totalBalls - ballsFaced);
    const requiredRate = (runsNeeded * 6) / ballsRemaining;

    if (requiredRate <= expectedRate + 1 && wicketsLost >= 4) {
      if (isLowerOrder) {
        applyFrequencyDelta(frequency, {
          wicket: -1,
          dot: 0,
          single: 2,
          two: 1,
          four: -1,
          six: -1,
        });
      } else {
        applyFrequencyDelta(frequency, {
          wicket: -3,
          dot: -1,
          single: 3,
          two: 1,
          four: -1,
          six: -2,
        });
      }
    } else if (requiredRate > expectedRate + 2.5) {
      applyFrequencyDelta(frequency, {
        wicket: 1,
        dot: -1,
        single: -1,
        two: 1,
        four: 2,
        six: 2,
      });
    }
  }

  return frequency;
};

const applyAbilityAdjustments = (frequency, gameState = {}) => {
  const battingRating = Number(gameState.battingRating) || 75;
  const attackingRating = Number(gameState.attackingRating) || 72;
  const bowlingRating = Number(gameState.bowlingRating) || 82;
  const battingEdge = (battingRating - 75) / 5;
  const bowlingEdge = (bowlingRating - 82) / 5;
  const netEdge = Math.max(-5, Math.min(5, battingEdge - bowlingEdge));
  const attackingEdge = Math.max(-5, Math.min(5, (attackingRating - 72) / 5));

  applyFrequencyDelta(frequency, {
    wicket: -netEdge * 0.75 + attackingEdge * 0.25,
    dot: -netEdge * 1.2 - attackingEdge * 1.25,
    single: netEdge * 0.8 - attackingEdge * 0.2,
    two: netEdge * 0.3 + attackingEdge * 0.2,
    four: netEdge * 0.65 + attackingEdge * 1.0,
    six: netEdge * 0.35 + attackingEdge * 0.8,
  });

  return frequency;
};

const applyInningsPhaseAdjustments = (frequency, format, gameState = {}) => {
  if (format !== "ODI_40" && format !== "ODI_50") return frequency;

  const ballsFaced = Math.max(0, Number(gameState.ballsFaced) || 0);
  const totalBalls = FORMAT_MODIFIERS[format].totalOvers * 6;
  const progress = ballsFaced / totalBalls;
  const wicketsLost = Math.max(0, Number(gameState.wicketsLost) || 0);

  // The first fifth of an ODI rewards building an innings.
  if (progress < 0.2) {
    applyFrequencyDelta(frequency, {
      wicket: 0,
      dot: format === "ODI_50" ? 8 : 6,
      single: 2,
      two: 0,
      four: -1,
      six: -1,
    });
  }

  // Teams with wickets in hand can accelerate near the end, but the change is
  // deliberately smaller than switching every batter to an aggressive mindset.
  if (progress >= 0.8) {
    if (wicketsLost <= 6) {
      applyFrequencyDelta(frequency, {
        wicket: 1,
        dot: -7,
        single: -1,
        two: 1,
        four: 4,
        six: 3,
      });
    } else {
      applyFrequencyDelta(frequency, {
        wicket: 1,
        dot: -2,
        single: 0,
        two: 0,
        four: 1,
        six: 1,
      });
    }
  }

  return frequency;
};

const applyMindsetAdjustments = (frequency, gameState = {}) => {
  if (gameState.mindset === "defensive") {
    applyFrequencyDelta(frequency, {
      wicket: -2,
      dot: 4,
      single: 4,
      two: 2,
      four: -3,
      six: -3,
    });
  } else if (gameState.mindset === "aggressive") {
    applyFrequencyDelta(frequency, {
      wicket: 1.5,
      dot: -3,
      single: -1,
      two: 0.5,
      four: 3,
      six: 2,
    });
  }

  return frequency;
};

const applyBatterRhythmAdjustments = (frequency, gameState = {}) => {
  const batterBallsFaced = Math.max(0, Number(gameState.batterBallsFaced) || 0);

  if (batterBallsFaced < 6) {
    const newBatterFactor = (6 - batterBallsFaced) / 6;
    applyFrequencyDelta(frequency, {
      wicket: 0.75 * newBatterFactor,
      dot: 2.5 * newBatterFactor,
      single: 1 * newBatterFactor,
      four: -0.8 * newBatterFactor,
      six: -0.5 * newBatterFactor,
    });
  } else {
    const settledFactor = Math.min(1, (batterBallsFaced - 6) / 24);
    applyFrequencyDelta(frequency, {
      wicket: -0.8 * settledFactor,
      dot: -1.5 * settledFactor,
      single: 1.5 * settledFactor,
      two: 0.5 * settledFactor,
      four: 0.4 * settledFactor,
      six: 0.2 * settledFactor,
    });
  }

  return frequency;
};

// Simplified realistic function - no complex multipliers
const getImprovedRandomOutcome = (
  playerArchetype,
  format,
  pitchType = "NORMAL",
  gameState = {}
) => {
  // Get the realistic base frequency for this format and player type
  const formatFreqs =
    FORMAT_BASE_FREQUENCIES[format] || FORMAT_BASE_FREQUENCIES.ODI_50;
  const baseFreq = formatFreqs[playerArchetype] || formatFreqs.ALL_ROUNDER;

  // Start with the realistic base frequency
  let frequency = [...baseFreq];

  // Apply only pitch modifiers (small adjustments)
  const pitchMod = PITCH_MODIFIERS[pitchType] || PITCH_MODIFIERS.NORMAL;
  applyFrequencyDelta(frequency, pitchMod);

  // Apply targeted format+pitch calibration, if configured.
  const formatPitchMod = FORMAT_PITCH_TUNING[format]?.[pitchType];
  if (formatPitchMod) {
    applyFrequencyDelta(frequency, formatPitchMod);
  }

  // Use current innings state to reduce extreme match-to-match volatility.
  applyConsistencyAdjustments(frequency, format, gameState);
  applyAbilityAdjustments(frequency, gameState);
  applyInningsPhaseAdjustments(frequency, format, gameState);
  applyMindsetAdjustments(frequency, gameState);
  applyBatterRhythmAdjustments(frequency, gameState);

  // Ensure no negative frequencies
  frequency = frequency.map((f) => Math.max(0, Math.round(f)));

  // Create cumulative sum for weighted selection
  const cumulativeSum = (
    (sum) => (value) =>
      (sum += value)
  )(0);
  const prefixSum = frequency.map(cumulativeSum);
  const totalWeight = prefixSum[prefixSum.length - 1];

  if (totalWeight === 0) return 1; // Fallback

  // Generate random outcome
  const random = Math.floor(Math.random() * totalWeight);

  // Find which outcome was selected
  for (let i = 0; i < prefixSum.length; i++) {
    if (random < prefixSum[i]) {
      return OUTCOMES[i];
    }
  }

  return OUTCOMES[OUTCOMES.length - 1]; // Fallback to six
};

// Helper function to assign player archetypes based on batting position
const getPlayerArchetypeByPosition = (batterIndex, format) => {
  // Different batting orders for different formats
  // Limited-overs #7/#8 are treated as finishing roles rather than pure accumulators.
  const archetypesByPosition = {
    T20: [
      "AGGRESSIVE",
      "AGGRESSIVE",
      "ANCHOR",
      "POWER_HITTER",
      "ALL_ROUNDER",
      "POWER_HITTER",
      "LOWER_ORDER_HITTER",
      "LOWER_ORDER_HITTER",
      "TAIL_ENDER",
      "TAIL_ENDER",
      "TAIL_ENDER",
    ],
    ODI_50: [
      "ANCHOR",
      "AGGRESSIVE",
      "ANCHOR",
      "ACCUMULATOR",
      "ALL_ROUNDER",
      "AGGRESSIVE",
      "LOWER_ORDER_HITTER",
      "LOWER_ORDER_HITTER",
      "TAIL_ENDER",
      "TAIL_ENDER",
      "TAIL_ENDER",
    ],
    ODI_40: [
      "AGGRESSIVE",
      "ANCHOR",
      "ANCHOR",
      "ALL_ROUNDER",
      "AGGRESSIVE",
      "POWER_HITTER",
      "LOWER_ORDER_HITTER",
      "LOWER_ORDER_HITTER",
      "TAIL_ENDER",
      "TAIL_ENDER",
      "TAIL_ENDER",
    ],
    TEST: [
      "ANCHOR",
      "ANCHOR",
      "ACCUMULATOR",
      "ANCHOR",
      "ALL_ROUNDER",
      "ALL_ROUNDER",
      "POWER_HITTER",
      "TAIL_ENDER",
      "TAIL_ENDER",
      "TAIL_ENDER",
      "TAIL_ENDER",
    ],
  };

  const positions = archetypesByPosition[format] || archetypesByPosition.ODI_50;
  return (
    positions[Math.min(Math.max(0, batterIndex), positions.length - 1)] ||
    "ALL_ROUNDER"
  );
};

// Export the main function with backward compatibility
const RandomWithIndex = (
  batterIndex,
  pitchType = "Normal",
  format = "ODI_50",
  gameState = {}
) => {
  const playerArchetype = getPlayerArchetypeByPosition(batterIndex, format);

  // Map pitch types from game format to system format
  const pitchTypeMap = {
    Normal: "NORMAL",
    Green: "GREEN",
    Hard: "HARD",
    Wet: "WET",
    Dusty: "DUSTY",
  };

  const mappedPitchType = pitchTypeMap[pitchType] || "NORMAL";
  return getImprovedRandomOutcome(
    playerArchetype,
    format,
    mappedPitchType,
    gameState
  );
};

export default RandomWithIndex;
// Create PLAYER_ARCHETYPES for backward compatibility with demo
const PLAYER_ARCHETYPES = {
  AGGRESSIVE: {
    name: "Aggressive",
    description: "High strike rate, takes risks",
  },
  ANCHOR: { name: "Anchor", description: "Builds innings, rotates strike" },
  POWER_HITTER: { name: "Power Hitter", description: "Big hitting, high risk" },
  LOWER_ORDER_HITTER: {
    name: "Lower Order Hitter",
    description: "Finishing role with boundary intent and wicket risk",
  },
  ACCUMULATOR: { name: "Accumulator", description: "Consistent run scoring" },
  ALL_ROUNDER: { name: "All Rounder", description: "Versatile batting style" },
  TAIL_ENDER: { name: "Tail Ender", description: "Lower order batsman" },
};

export {
  getImprovedRandomOutcome,
  PLAYER_ARCHETYPES,
  FORMAT_MODIFIERS,
  PITCH_MODIFIERS,
  getPlayerArchetypeByPosition,
  FORMAT_BASE_FREQUENCIES,
};
