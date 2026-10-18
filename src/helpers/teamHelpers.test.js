import squadCatalog from "../data/cric-vfinal.json";
import {
  getDefaultXI,
  getInitialPlayingXI,
  getSquad,
  getTeamStrengths,
  rememberPlayingXIs,
} from "./teamHelpers";

test("team batting strength only averages batting-capable players", () => {
  const xi = getDefaultXI(squadCatalog, "India", "ODI_50");
  const battingUnit = xi.filter((player) => player.role !== "Bowler");
  const expected =
    battingUnit.reduce((total, player) => total + player.batting, 0) /
    battingUnit.length;

  expect(getTeamStrengths(xi).batting).toBe(Math.round(expected));
  expect(getTeamStrengths(xi).batting).toBeGreaterThan(80);
});

test("40-over pools expand independently of T20 and 50-over squads", () => {
  const t20Squad = getSquad(squadCatalog, "India", "T20");
  const odi40Squad = getSquad(squadCatalog, "India", "ODI_40");
  const odi50Squad = getSquad(squadCatalog, "India", "ODI_50");

  expect(t20Squad).toHaveLength(15);
  expect(odi40Squad).toHaveLength(45);
  expect(odi50Squad).toHaveLength(15);
  expect(t20Squad[0].name).toBe("Abhishek Sharma");
  expect(odi50Squad[0].name).toBe("Shubman Gill");
  expect(t20Squad.map((player) => player.id)).not.toEqual(
    odi50Squad.map((player) => player.id)
  );
});

test("catalog pools have eleven starters, unique IDs and valid profiles", () => {
  Object.entries(squadCatalog.formats).forEach(([format, teams]) => {
    Object.entries(teams).forEach(
      ([team, { defaultXI, reserves, squadSize }]) => {
        const ids = [...defaultXI, ...reserves];
        expect(defaultXI).toHaveLength(11);
        expect(new Set(ids).size).toBe(ids.length);
        expect(ids.length).toBe(format === "ODI_40" ? squadSize : 15);
        const squad = getSquad(squadCatalog, team, format);
        expect(squad).toHaveLength(ids.length);
        squad.forEach((player) => {
          [player.batting, player.attacking, player.bowling].forEach(
            (rating) => {
              expect(rating).toBeGreaterThanOrEqual(1);
              expect(rating).toBeLessThanOrEqual(100);
            }
          );
        });
        if (format === "ODI_40")
          expect(
            getDefaultXI(squadCatalog, team, format).some(
              (player) => player.role === "Wicketkeeper"
            )
          ).toBe(true);
      }
    );
  });
});

test("40-over ratings override shared profiles without changing other formats", () => {
  const rachin40 = getSquad(squadCatalog, "NewZealand", "ODI_40").find(
    (player) => player.id === "nz-rachin-ravindra"
  );
  const rachin50 = getSquad(squadCatalog, "NewZealand", "T20").find(
    (player) => player.id === "nz-rachin-ravindra"
  );
  expect(rachin40).toEqual(
    expect.objectContaining({ batting: 87, bowling: 64 })
  );
  expect(rachin50.batting).toBe(squadCatalog.players[rachin50.id].batting);
  expect(rachin50.bowling).toBe(squadCatalog.players[rachin50.id].bowling);
});

test("Bangladesh is available only in the new 40-over pool", () => {
  expect(getSquad(squadCatalog, "Bangladesh", "ODI_40")).toHaveLength(30);
  expect(getDefaultXI(squadCatalog, "Bangladesh", "ODI_40")).toHaveLength(11);
  expect(getSquad(squadCatalog, "Bangladesh", "ODI_50")).toEqual([]);
  expect(getSquad(squadCatalog, "Bangladesh", "T20")).toEqual([]);
});

test("legacy catalogs still resolve 40-over games to the ODI pool", () => {
  const { ODI_40, ...legacyFormats } = squadCatalog.formats;
  const legacyCatalog = { ...squadCatalog, formats: legacyFormats };
  expect(getSquad(legacyCatalog, "India", "ODI_40")).toHaveLength(15);
});

test("a confirmed playing XI is remembered and reused for the team's next match", () => {
  const defaultXI = getDefaultXI(squadCatalog, "India", "ODI_50");
  const changedXI = [...defaultXI].reverse();
  const rememberedPlayingXIs = rememberPlayingXIs({}, { India: changedXI });

  expect(
    getInitialPlayingXI(squadCatalog, "India", "ODI_50", rememberedPlayingXIs)
  ).toEqual(changedXI);
  expect(rememberedPlayingXIs.India).not.toBe(changedXI);
});

test("an invalid saved selection does not replace the format's default XI", () => {
  const rememberedPlayingXIs = rememberPlayingXIs(
    {},
    {
      India: getDefaultXI(squadCatalog, "India", "ODI_50").slice(0, 10),
    }
  );

  expect(
    getInitialPlayingXI(squadCatalog, "India", "ODI_50", rememberedPlayingXIs)
  ).toEqual(getDefaultXI(squadCatalog, "India", "ODI_50"));
});
