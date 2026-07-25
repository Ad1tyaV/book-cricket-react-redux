import {
  getImprovedRandomOutcome,
  getPlayerArchetypeByPosition,
} from "./improvedRandomNumber";

const samplePlayer = ({
  battingRating = 80,
  attackingRating = 80,
  bowlingRating = 82,
  pitchType = "NORMAL",
  mindset = "default",
  batterBallsFaced = 6,
}) => {
  let seed = 123456;
  const random = jest.spyOn(Math, "random").mockImplementation(() => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  });
  const result = { runs: 0, wickets: 0, boundaries: 0, dots: 0 };

  for (let ball = 0; ball < 5000; ball++) {
    const outcome = getImprovedRandomOutcome(
      "ALL_ROUNDER",
      "ODI_50",
      pitchType,
      {
        battingRating,
        attackingRating,
        bowlingRating,
        mindset,
        batterBallsFaced,
      }
    );
    if (outcome === -1) result.wickets += 1;
    else {
      result.runs += outcome;
      if (outcome === 0) result.dots += 1;
      if (outcome === 4 || outcome === 6) result.boundaries += 1;
    }
  }

  random.mockRestore();
  return result;
};

test("batting and bowling ratings materially change delivery outcomes", () => {
  const strongBatter = samplePlayer({
    battingRating: 95,
    attackingRating: 80,
    bowlingRating: 70,
  });
  const weakBatter = samplePlayer({
    battingRating: 40,
    attackingRating: 80,
    bowlingRating: 95,
  });

  expect(strongBatter.runs).toBeGreaterThan(weakBatter.runs);
  expect(strongBatter.wickets).toBeLessThan(weakBatter.wickets);
});

test("attacking rating produces a higher-risk, higher-boundary style", () => {
  const attacker = samplePlayer({ attackingRating: 96 });
  const anchor = samplePlayer({ attackingRating: 52 });

  expect(attacker.runs).toBeGreaterThan(anchor.runs);
  expect(attacker.boundaries).toBeGreaterThan(anchor.boundaries);
  expect(attacker.wickets).toBeGreaterThan(anchor.wickets);
});

test("wet and green pitches remain playable", () => {
  const normal = samplePlayer({ pitchType: "NORMAL" });
  const green = samplePlayer({ pitchType: "GREEN" });
  const wet = samplePlayer({ pitchType: "WET" });

  expect(green.runs).toBeGreaterThan(normal.runs * 0.7);
  expect(wet.runs).toBeGreaterThan(normal.runs * 0.7);
  expect(green.wickets).toBeLessThan(normal.wickets * 1.6);
  expect(wet.wickets).toBeLessThan(normal.wickets * 1.6);
});

test("mindsets trade scoring intent against dismissal risk", () => {
  const defensive = samplePlayer({ mindset: "defensive" });
  const balanced = samplePlayer({ mindset: "default" });
  const aggressive = samplePlayer({ mindset: "aggressive" });

  expect(defensive.wickets).toBeLessThan(balanced.wickets);
  expect(balanced.wickets).toBeLessThan(aggressive.wickets);
  expect(defensive.boundaries).toBeLessThan(balanced.boundaries);
  expect(balanced.boundaries).toBeLessThan(aggressive.boundaries);
  expect(defensive.dots).toBeGreaterThan(aggressive.dots);
});

test("a settled batter improves gradually with balls faced", () => {
  const newBatter = samplePlayer({ batterBallsFaced: 0 });
  const settledBatter = samplePlayer({ batterBallsFaced: 30 });

  expect(settledBatter.wickets).toBeLessThan(newBatter.wickets);
  expect(settledBatter.dots).toBeLessThan(newBatter.dots);
  expect(settledBatter.runs).toBeGreaterThan(newBatter.runs);
});

test("batting positions use the matching archetype without an index shift", () => {
  expect(getPlayerArchetypeByPosition(0, "ODI_50")).toBe("ANCHOR");
  expect(getPlayerArchetypeByPosition(1, "ODI_50")).toBe("AGGRESSIVE");
  expect(getPlayerArchetypeByPosition(10, "ODI_50")).toBe("TAIL_ENDER");
});
