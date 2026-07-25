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
