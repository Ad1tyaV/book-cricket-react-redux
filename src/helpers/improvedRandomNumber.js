// Realistic cricket scoring system that adapts to different formats
const OUTCOMES = [-1, 0, 1, 2, 3, 4, 6]; // Possible cricket outcomes

// Realistic base frequencies for different formats
// These are calibrated to produce realistic run rates
const FORMAT_BASE_FREQUENCIES = {
    T20: {
        // T20: Target ~8-9 runs per over (realistic T20 average)
        AGGRESSIVE: [5, 45, 30, 15, 2, 18, 12],    // ~9.2 RPO
        ANCHOR: [4, 55, 40, 18, 3, 15, 8],         // ~7.8 RPO  
        POWER_HITTER: [8, 40, 20, 10, 1, 20, 18], // ~10.5 RPO
        ACCUMULATOR: [3, 50, 50, 20, 4, 12, 6],   // ~7.5 RPO
        ALL_ROUNDER: [5, 50, 35, 15, 2, 16, 10],  // ~8.5 RPO
        TAIL_ENDER: [15, 70, 25, 8, 1, 8, 3]      // ~5.2 RPO
    },
    ODI_50: {
        // ODI: Target ~5-6 runs per over (realistic ODI average)
        AGGRESSIVE: [4, 65, 40, 18, 3, 15, 8],     // ~6.2 RPO
        ANCHOR: [3, 75, 50, 20, 4, 12, 4],         // ~5.4 RPO
        POWER_HITTER: [8, 60, 25, 12, 2, 18, 12], // ~7.8 RPO
        ACCUMULATOR: [2, 70, 60, 25, 5, 10, 3],   // ~5.8 RPO
        ALL_ROUNDER: [4, 70, 45, 18, 3, 13, 6],   // ~6.0 RPO
        TAIL_ENDER: [12, 85, 30, 10, 2, 6, 2]     // ~3.8 RPO
    },
    ODI_40: {
        // 40-over: Target ~6-7 runs per over
        AGGRESSIVE: [4, 60, 38, 16, 3, 16, 9],     // ~6.8 RPO
        ANCHOR: [3, 70, 48, 19, 4, 13, 5],         // ~5.9 RPO
        POWER_HITTER: [7, 55, 23, 11, 2, 16, 11], // ~8.5 RPO
        ACCUMULATOR: [2, 65, 55, 23, 5, 11, 4],   // ~6.2 RPO
        ALL_ROUNDER: [4, 65, 42, 17, 3, 14, 7],   // ~6.5 RPO
        TAIL_ENDER: [12, 80, 28, 9, 2, 7, 3]      // ~4.2 RPO
    }
};

// Format-specific modifiers
const FORMAT_MODIFIERS = {
    T20: {
        name: "T20",
        totalOvers: 20,
        aggressionMultiplier: 1.5, // More aggressive
        boundaryBoost: 1.4, // More 4s and 6s
        dotPenalty: 0.7, // Fewer dot balls
        wicketRisk: 1.3 // Higher risk of getting out
    },
    ODI_50: {
        name: "50 Over ODI",
        totalOvers: 50,
        aggressionMultiplier: 1.0, // Balanced
        boundaryBoost: 1.0,
        dotPenalty: 1.0,
        wicketRisk: 1.0
    },
    ODI_40: {
        name: "40 Over ODI",
        totalOvers: 40,
        aggressionMultiplier: 1.2, // Slightly more aggressive
        boundaryBoost: 1.15,
        dotPenalty: 0.85,
        wicketRisk: 1.1
    },
    TEST: {
        name: "Test Match",
        totalOvers: 90, // Typical day's play
        aggressionMultiplier: 0.6, // Very conservative
        boundaryBoost: 0.7,
        dotPenalty: 1.4, // More dot balls acceptable
        wicketRisk: 0.7 // Lower risk tolerance
    }
};

// Pitch condition modifiers - adjusted difficulties
const PITCH_MODIFIERS = {
    NORMAL: { wicket: 0, dot: 0, single: 0, two: 0, three: 0, four: 0, six: 0 },
    GREEN: { wicket: 2, dot: 6, single: 4, two: 1, three: 0, four: -2, six: -3 }, // Difficulty 7
    HARD: { wicket: -2, dot: -6, single: -2, two: 1, three: 0, four: 4, six: 5 }, // Difficulty 2
    WET: { wicket: 1, dot: 6, single: 4, two: 2, three: 0, four: -2, six: -5 }, // Difficulty 6 (reduced from 8)
    // Dusty stays distinct from Normal: more attritional, fewer boundaries.
    DUSTY: { wicket: 2, dot: 8, single: -2, two: -1, three: 0, four: -2, six: -3 }
};

// Format+pitch tuning to avoid inflated totals in specific combinations.
// ODI_40 + Normal was producing unusually high totals, so we soften boundary rate.
const FORMAT_PITCH_TUNING = {
    ODI_40: {
        NORMAL: { wicket: 1, dot: 5, single: -1, two: -1, three: 0, four: -2, six: -3 }
    }
};

const EXPECTED_RUN_RATE = {
    T20: 8.6,
    ODI_40: 6.2,
    ODI_50: 5.7,
    TEST: 3.4
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
    const totalBalls = FORMAT_MODIFIERS[format]?.totalOvers * 6 || 300;

    if (ballsFaced <= 0) return frequency;

    const progress = ballsFaced / totalBalls;
    const currentRunRate = currentScore / (ballsFaced / 6);
    const expectedRate = EXPECTED_RUN_RATE[format] || EXPECTED_RUN_RATE.ODI_50;

    // Prevent dramatic collapses too early/often.
    if (wicketsLost >= 5 && progress < 0.8) {
        applyFrequencyDelta(frequency, { wicket: -4, dot: -3, single: 4, two: 1, four: 1, six: 0 });
    }

    // Pull down unrealistic hitting streaks to avoid excessive totals.
    if (currentRunRate > expectedRate + 1.8 && progress < 0.9) {
        applyFrequencyDelta(frequency, { wicket: 1, dot: 4, single: 2, two: 0, four: -3, six: -4 });
    }

    // Lift unrealistically low-scoring phases if wickets are still in hand.
    if (currentRunRate < expectedRate - 1.8 && wicketsLost <= 7 && progress > 0.2) {
        applyFrequencyDelta(frequency, { wicket: -2, dot: -4, single: 4, two: 2, four: 1, six: 0 });
    }

    // Chasing logic: reduce boom-bust behavior when required rate is manageable.
    if (targetScore) {
        const runsNeeded = targetScore - currentScore;
        const ballsRemaining = Math.max(1, totalBalls - ballsFaced);
        const requiredRate = (runsNeeded * 6) / ballsRemaining;

        if (requiredRate <= expectedRate + 1 && wicketsLost >= 4) {
            applyFrequencyDelta(frequency, { wicket: -3, dot: -1, single: 3, two: 1, four: -1, six: -2 });
        } else if (requiredRate > expectedRate + 2.5) {
            applyFrequencyDelta(frequency, { wicket: 1, dot: -1, single: -1, two: 1, four: 2, six: 2 });
        }
    }

    return frequency;
};

// Game situation modifiers
const getSituationModifier = (ballsFaced, totalBalls, currentScore, targetScore = null, wicketsLost) => {
    const oversRemaining = (totalBalls - ballsFaced) / 6;
    const wicketsInHand = 10 - wicketsLost;

    let aggressionFactor = 1.0;
    let riskFactor = 1.0;

    // Death overs (last 10% of innings)
    if (ballsFaced > totalBalls * 0.9) {
        aggressionFactor = 1.8;
        riskFactor = 1.4;
    }
    // Middle overs (40-80% of innings)  
    else if (ballsFaced > totalBalls * 0.4 && ballsFaced < totalBalls * 0.8) {
        aggressionFactor = 0.8;
        riskFactor = 0.8;
    }
    // Powerplay (first 20% of innings)
    else if (ballsFaced < totalBalls * 0.2) {
        aggressionFactor = 1.3;
        riskFactor = 1.1;
    }

    // Chasing scenario
    if (targetScore) {
        const requiredRate = (targetScore - currentScore) / oversRemaining;
        const currentRate = currentScore / (ballsFaced / 6);

        if (requiredRate > currentRate * 1.5) {
            aggressionFactor *= 2.0; // Desperate situation
            riskFactor *= 1.8;
        } else if (requiredRate > currentRate * 1.2) {
            aggressionFactor *= 1.4; // Need to accelerate
            riskFactor *= 1.2;
        }
    }

    // Wickets in hand factor
    if (wicketsInHand <= 3) {
        riskFactor *= 0.6; // Play safe with few wickets
        aggressionFactor *= 0.7;
    } else if (wicketsInHand >= 7) {
        riskFactor *= 1.2; // Can afford risks
        aggressionFactor *= 1.1;
    }

    return { aggressionFactor, riskFactor };
};

// Simplified realistic function - no complex multipliers
const getImprovedRandomOutcome = (
    playerArchetype,
    format,
    pitchType = 'NORMAL',
    gameState = {}
) => {
    // Get the realistic base frequency for this format and player type
    const formatFreqs = FORMAT_BASE_FREQUENCIES[format] || FORMAT_BASE_FREQUENCIES.ODI_50;
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

    // Ensure no negative frequencies
    frequency = frequency.map(f => Math.max(0, Math.round(f)));

    // Create cumulative sum for weighted selection
    const cumulativeSum = ((sum) => (value) => (sum += value))(0);
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
    // Position 6 (index 6) is now POWER_HITTER for faster scoring (Jadeja fix)
    const archetypesByPosition = {
        T20: ['AGGRESSIVE', 'AGGRESSIVE', 'ANCHOR', 'POWER_HITTER', 'ALL_ROUNDER', 'POWER_HITTER', 'POWER_HITTER', 'TAIL_ENDER', 'TAIL_ENDER', 'TAIL_ENDER', 'TAIL_ENDER'],
        ODI_50: ['ANCHOR', 'AGGRESSIVE', 'ANCHOR', 'ACCUMULATOR', 'ALL_ROUNDER', 'AGGRESSIVE', 'POWER_HITTER', 'TAIL_ENDER', 'TAIL_ENDER', 'TAIL_ENDER', 'TAIL_ENDER'],
        ODI_40: ['AGGRESSIVE', 'ANCHOR', 'ANCHOR', 'ALL_ROUNDER', 'AGGRESSIVE', 'POWER_HITTER', 'POWER_HITTER', 'TAIL_ENDER', 'TAIL_ENDER', 'TAIL_ENDER', 'TAIL_ENDER'],
        TEST: ['ANCHOR', 'ANCHOR', 'ACCUMULATOR', 'ANCHOR', 'ALL_ROUNDER', 'ALL_ROUNDER', 'POWER_HITTER', 'TAIL_ENDER', 'TAIL_ENDER', 'TAIL_ENDER', 'TAIL_ENDER']
    };

    const positions = archetypesByPosition[format] || archetypesByPosition.ODI_50;
    return positions[Math.min(batterIndex + 1, positions.length - 1)] || 'ALL_ROUNDER';
};

// Export the main function with backward compatibility
const RandomWithIndex = (batterIndex, pitchType = 'Normal', format = 'ODI_50', gameState = {}) => {
    const playerArchetype = getPlayerArchetypeByPosition(batterIndex, format);

    // Map pitch types from game format to system format
    const pitchTypeMap = {
        'Normal': 'NORMAL',
        'Green': 'GREEN',
        'Hard': 'HARD',
        'Wet': 'WET',
        'Dusty': 'DUSTY'
    };

    const mappedPitchType = pitchTypeMap[pitchType] || 'NORMAL';
    return getImprovedRandomOutcome(playerArchetype, format, mappedPitchType, gameState);
};

export default RandomWithIndex;
// Create PLAYER_ARCHETYPES for backward compatibility with demo
const PLAYER_ARCHETYPES = {
    AGGRESSIVE: { name: "Aggressive", description: "High strike rate, takes risks" },
    ANCHOR: { name: "Anchor", description: "Builds innings, rotates strike" },
    POWER_HITTER: { name: "Power Hitter", description: "Big hitting, high risk" },
    ACCUMULATOR: { name: "Accumulator", description: "Consistent run scoring" },
    ALL_ROUNDER: { name: "All Rounder", description: "Versatile batting style" },
    TAIL_ENDER: { name: "Tail Ender", description: "Lower order batsman" }
};

export {
    getImprovedRandomOutcome,
    PLAYER_ARCHETYPES,
    FORMAT_MODIFIERS,
    PITCH_MODIFIERS,
    getPlayerArchetypeByPosition,
    FORMAT_BASE_FREQUENCIES
};
