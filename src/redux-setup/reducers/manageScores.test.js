import manageScores from "./manageScores";
import squadCatalog from "../../data/cric-vfinal.json";
import { getDefaultXI } from "../../helpers/teamHelpers";

const indiaT20 = getDefaultXI(squadCatalog, "India", "T20");
const australiaT20 = getDefaultXI(squadCatalog, "Australia", "T20");

const simulateNormalPitchInnings = ({
  format,
  overs,
  innings = 80,
  seed = 98765,
}) => {
  const englandXI = getDefaultXI(squadCatalog, "England", format);
  const indiaXI = getDefaultXI(squadCatalog, "India", format);
  let randomSeed = seed;
  const random = jest.spyOn(Math, "random").mockImplementation(() => {
    randomSeed = (randomSeed * 16807) % 2147483647;
    return (randomSeed - 1) / 2147483646;
  });
  const samples = [];

  for (let sample = 0; sample < innings; sample++) {
    let state = manageScores(undefined, {
      type: "PICK_TEAMS",
      payload: {
        team1: "England",
        team2: "India",
        overs,
        format,
        team1PlayingXI: englandXI,
        team2PlayingXI: indiaXI,
      },
    });
    state = manageScores(state, {
      type: "SCORE_MANY",
      payload: { deliveries: overs * 6, pitchType: "Normal" },
    });
    samples.push({
      total: state.team1Total,
      highestScore: Math.max(0, ...Object.values(state.team1Stats)),
    });
  }

  random.mockRestore();
  return samples;
};

const pickedMatch = () =>
  manageScores(undefined, {
    type: "PICK_TEAMS",
    payload: {
      team1: "India",
      team2: "Australia",
      overs: 20,
      format: "T20",
      team1PlayingXI: indiaT20,
      team2PlayingXI: australiaT20,
    },
  });

test("a batting innings never advances beyond the selected eleven", () => {
  const random = jest.spyOn(Math, "random").mockReturnValue(0);
  let state = pickedMatch();

  for (let delivery = 0; delivery < 20; delivery++) {
    state = manageScores(state, {
      type: "SCORE",
      payload: { pitchType: "Normal" },
    });
  }

  expect(state.team1Wickets).toBe(10);
  expect(state.onStrike.batterIndex).toBeLessThanOrEqual(10);
  expect(
    Object.keys(state.team1BallsFacedByPlayer).every(
      (index) => Number(index) >= 0 && Number(index) <= 10
    )
  ).toBe(true);
  expect(state.team1PlayingXI).toHaveLength(11);
  random.mockRestore();
});

test("match setup stores the chosen batting order", () => {
  const reversedXI = [...indiaT20].reverse();
  const state = manageScores(undefined, {
    type: "PICK_TEAMS",
    payload: {
      team1: "India",
      team2: "Australia",
      team1PlayingXI: reversedXI,
      team2PlayingXI: australiaT20,
    },
  });

  expect(state.team1PlayingXI[0].name).toBe("Arshdeep Singh");
  expect(state.onStrike.batterIndex).toBe(0);
  expect(state.offStrike.batterIndex).toBe(1);
});

test("multiple overs can be scored in one reducer update", () => {
  const random = jest.spyOn(Math, "random").mockReturnValue(0.5);
  const state = manageScores(pickedMatch(), {
    type: "SCORE_MANY",
    payload: { deliveries: 60, pitchType: "Normal" },
  });

  expect(state.team1BallsFaced).toBe(60);
  expect(state.team1BowlingStrength).toBeGreaterThan(0);
  expect(state.team2BowlingStrength).toBeGreaterThan(0);
  random.mockRestore();
});

test("only batters currently at the crease can change mindset", () => {
  const initial = pickedMatch();
  const defensiveOpener = manageScores(initial, {
    type: "SET_BATTER_MINDSET",
    payload: { team: "India", batterIndex: 0, mindset: "defensive" },
  });
  const invalidWaitingBatter = manageScores(defensiveOpener, {
    type: "SET_BATTER_MINDSET",
    payload: { team: "India", batterIndex: 2, mindset: "aggressive" },
  });

  expect(defensiveOpener.team1Mindsets[0]).toBe("defensive");
  expect(invalidWaitingBatter).toBe(defensiveOpener);
});

test("manual autoplay can pause as soon as a wicket falls", () => {
  const random = jest.spyOn(Math, "random").mockReturnValue(0);
  const state = manageScores(pickedMatch(), {
    type: "SCORE_MANY",
    payload: {
      deliveries: 60,
      pitchType: "Normal",
      stopOnWicket: true,
    },
  });

  expect(state.team1Wickets).toBe(1);
  expect(state.team1BallsFaced).toBe(1);
  random.mockRestore();
});

test("normal-pitch 50-over innings stay within a realistic scoring distribution", () => {
  const samples = simulateNormalPitchInnings({
    format: "ODI_50",
    overs: 50,
  });
  const average =
    samples.reduce((sum, innings) => sum + innings.total, 0) / samples.length;
  const sortedTotals = samples.map(({ total }) => total).sort((a, b) => a - b);
  const percentile90 = sortedTotals[Math.floor(sortedTotals.length * 0.9)];

  expect(average).toBeGreaterThan(220);
  expect(average).toBeLessThan(310);
  expect(percentile90).toBeLessThan(360);
  expect(samples.filter(({ total }) => total >= 400)).toHaveLength(0);
  expect(Math.max(...samples.map(({ highestScore }) => highestScore))).toBeLessThan(
    200
  );
});

test("normal-pitch 40-over innings are quicker than ODIs without reaching T20 rates", () => {
  const samples = simulateNormalPitchInnings({
    format: "ODI_40",
    overs: 40,
    seed: 24680,
  });
  const average =
    samples.reduce((sum, innings) => sum + innings.total, 0) / samples.length;
  const averageRunRate = average / 40;

  expect(average).toBeGreaterThan(190);
  expect(average).toBeLessThan(285);
  expect(averageRunRate).toBeLessThan(7);
  expect(samples.filter(({ total }) => total >= 350)).toHaveLength(0);
});
