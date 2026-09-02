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

test("T20 and ODI formats resolve different 15-player squads", () => {
  const t20Squad = getSquad(squadCatalog, "India", "T20");
  const odi40Squad = getSquad(squadCatalog, "India", "ODI_40");
  const odi50Squad = getSquad(squadCatalog, "India", "ODI_50");

  expect(t20Squad).toHaveLength(15);
  expect(odi40Squad).toHaveLength(15);
  expect(odi50Squad).toEqual(odi40Squad);
  expect(t20Squad[0].name).toBe("Abhishek Sharma");
  expect(odi50Squad[0].name).toBe("Shubman Gill");
  expect(t20Squad.map((player) => player.id)).not.toEqual(
    odi50Squad.map((player) => player.id)
  );
});

test("every catalog selection has eleven starters and four reserves", () => {
  Object.values(squadCatalog.formats).forEach((format) => {
    Object.values(format).forEach(({ defaultXI, reserves }) => {
      expect(defaultXI).toHaveLength(11);
      expect(reserves).toHaveLength(4);
      expect(new Set([...defaultXI, ...reserves]).size).toBe(15);
    });
  });
});

test("a confirmed playing XI is remembered and reused for the team's next match", () => {
  const defaultXI = getDefaultXI(squadCatalog, "India", "ODI_50");
  const changedXI = [...defaultXI].reverse();
  const rememberedPlayingXIs = rememberPlayingXIs({}, { India: changedXI });

  expect(
    getInitialPlayingXI(
      squadCatalog,
      "India",
      "ODI_50",
      rememberedPlayingXIs
    )
  ).toEqual(changedXI);
  expect(rememberedPlayingXIs.India).not.toBe(changedXI);
});

test("an invalid saved selection does not replace the format's default XI", () => {
  const rememberedPlayingXIs = rememberPlayingXIs({}, {
    India: getDefaultXI(squadCatalog, "India", "ODI_50").slice(0, 10),
  });

  expect(
    getInitialPlayingXI(
      squadCatalog,
      "India",
      "ODI_50",
      rememberedPlayingXIs
    )
  ).toEqual(getDefaultXI(squadCatalog, "India", "ODI_50"));
});
