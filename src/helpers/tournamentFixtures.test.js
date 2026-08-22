import {
  generateTournamentFixtures,
  generateSingleTableKnockouts,
  getTournamentGroup,
} from "./tournamentFixtures";

test("a tri-series schedules every pairing twice", () => {
  const fixtures = generateTournamentFixtures(
    ["India", "Australia", "England"],
    "round_robin"
  );

  expect(fixtures).toHaveLength(6);
  const pairings = fixtures.map(({ team1, team2 }) =>
    [team1, team2].sort().join("-")
  );
  expect(
    pairings.filter((pairing) => pairing === "Australia-India")
  ).toHaveLength(2);
  expect(
    pairings.filter((pairing) => pairing === "England-India")
  ).toHaveLength(2);
  expect(
    pairings.filter((pairing) => pairing === "Australia-England")
  ).toHaveLength(2);
});

test("a tri-series advances the top two teams directly to the final", () => {
  const knockout = generateSingleTableKnockouts([
    { name: "India", points: 8 },
    { name: "Australia", points: 6 },
    { name: "England", points: 2 },
  ]);

  expect(knockout).toEqual({
    stage: "Final",
    fixtures: [{ team1: "India", team2: "Australia", stage: "Final" }],
  });
});

test("round robin remains a single table even with an even team count", () => {
  const teams = ["India", "Australia", "England", "Pakistan"];
  const fixtures = generateTournamentFixtures(teams, "round_robin");

  expect(fixtures).toHaveLength(6);
  expect(fixtures.every(({ group }) => group === "ALL")).toBe(true);
  expect(
    teams.map((team) => getTournamentGroup(teams, team, "round_robin"))
  ).toEqual(["ALL", "ALL", "ALL", "ALL"]);
});

test("group stage is only created when explicitly selected", () => {
  const teams = ["India", "Australia", "England", "Pakistan", "NewZealand"];
  const fixtures = generateTournamentFixtures(teams, "group_stage");

  expect(fixtures).toHaveLength(4);
  expect(fixtures.filter(({ group }) => group === "A")).toHaveLength(3);
  expect(fixtures.filter(({ group }) => group === "B")).toHaveLength(1);
  expect(
    teams.map((team) => getTournamentGroup(teams, team, "group_stage"))
  ).toEqual(["A", "A", "A", "B", "B"]);
});
