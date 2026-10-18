import squadCatalog from "../../data/cric-vfinal.json";
import loadSquadCatalog, { SQUAD_CATALOG_URL } from "./loadSquadCatalog";

const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
  jest.restoreAllMocks();
});

test("loads the live squad catalog as the primary team data source", async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue(squadCatalog),
  });
  const dispatch = jest.fn();

  await loadSquadCatalog()(dispatch);

  expect(global.fetch).toHaveBeenCalledWith(SQUAD_CATALOG_URL, {
    cache: "no-store",
  });
  expect(dispatch).toHaveBeenCalledWith({
    type: "SET_TEAM_CATALOG",
    payload: squadCatalog,
  });
});

test("keeps the bundled fallback when the live catalog is unavailable", async () => {
  global.fetch = jest.fn().mockRejectedValue(new Error("offline"));
  const dispatch = jest.fn();

  await loadSquadCatalog()(dispatch);

  expect(dispatch).not.toHaveBeenCalled();
});

test("an older live catalog retains the bundled 40-over pools and ratings", async () => {
  const legacy = JSON.parse(JSON.stringify(squadCatalog));
  delete legacy.formats.ODI_40;
  Object.values(legacy.players).forEach(
    (player) => delete player.ratingsByFormat
  );
  delete legacy.players["bd-litton-das"];
  global.fetch = jest
    .fn()
    .mockResolvedValue({ ok: true, json: async () => legacy });
  const dispatch = jest.fn();
  await loadSquadCatalog()(dispatch);
  const catalog = dispatch.mock.calls[0][0].payload;
  expect(catalog.formats.ODI_40.Bangladesh).toEqual(
    squadCatalog.formats.ODI_40.Bangladesh
  );
  expect(catalog.formats.ODI).toEqual(legacy.formats.ODI);
  expect(catalog.players["bd-litton-das"]).toEqual(
    squadCatalog.players["bd-litton-das"]
  );
  expect(
    catalog.players["nz-rachin-ravindra"].ratingsByFormat.ODI_40.bowling
  ).toBe(64);
});
