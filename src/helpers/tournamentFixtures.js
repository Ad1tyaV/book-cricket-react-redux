export const getTournamentGroup = (
  teams = [],
  teamName,
  structure = "round_robin"
) => {
  if (structure !== "group_stage" || teams.length < 4) return "ALL";
  const groupASize = Math.ceil(teams.length / 2);
  return teams.indexOf(teamName) < groupASize ? "A" : "B";
};

export const generateTournamentFixtures = (
  teams = [],
  structure = "round_robin"
) => {
  const useGroups = structure === "group_stage" && teams.length >= 4;

  if (useGroups) {
    const groupASize = Math.ceil(teams.length / 2);
    const groups = {
      A: teams.slice(0, groupASize),
      B: teams.slice(groupASize),
    };

    return Object.entries(groups).flatMap(([group, groupTeams]) => {
      const fixtures = [];
      for (let first = 0; first < groupTeams.length; first++) {
        for (let second = first + 1; second < groupTeams.length; second++) {
          fixtures.push({
            team1: groupTeams[first],
            team2: groupTeams[second],
            stage: `Group ${group}`,
            group,
          });
        }
      }
      return fixtures;
    });
  }

  const fixtures = [];
  const meetingsPerPair = teams.length === 3 ? 2 : 1;
  for (let meeting = 0; meeting < meetingsPerPair; meeting++) {
    for (let first = 0; first < teams.length; first++) {
      for (let second = first + 1; second < teams.length; second++) {
        fixtures.push({
          team1: teams[first],
          team2: teams[second],
          stage: teams.length === 3 ? `Round ${meeting + 1}` : "Round Robin",
          group: "ALL",
        });
      }
    }
  }

  return fixtures;
};

export const generateSingleTableKnockouts = (sortedStandings = []) => {
  if (sortedStandings.length === 3) {
    return {
      stage: "Final",
      fixtures: [
        {
          team1: sortedStandings[0].name,
          team2: sortedStandings[1].name,
          stage: "Final",
        },
      ],
    };
  }

  if (sortedStandings.length >= 4) {
    return {
      stage: "Semi-Final",
      fixtures: [
        {
          team1: sortedStandings[0].name,
          team2: sortedStandings[3].name,
          stage: "Semi-Final 1",
        },
        {
          team1: sortedStandings[1].name,
          team2: sortedStandings[2].name,
          stage: "Semi-Final 2",
        },
      ],
    };
  }

  return { stage: "Final", fixtures: [] };
};
