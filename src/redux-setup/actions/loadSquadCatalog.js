import bundledSquadCatalog from "../../data/cric-vfinal.json";
import { isSquadCatalog } from "../../helpers/teamHelpers";

export const SQUAD_CATALOG_URL =
  "https://raw.githubusercontent.com/Ad1tyaV/pyTestFiles/refs/heads/master/cric-vfinal.json";

const loadSquadCatalog = () => async (dispatch) => {
  if (typeof fetch !== "function") return;

  try {
    const response = await fetch(SQUAD_CATALOG_URL, { cache: "no-store" });
    if (!response.ok) return;

    const catalog = await response.json();
    if (isSquadCatalog(catalog)) {
      // Keep the bundled 40-over pool when the live catalog predates it.
      let nextCatalog = catalog;
      if (!catalog.formats.ODI_40) {
        const players = { ...catalog.players };
        Object.entries(bundledSquadCatalog.players).forEach(([id, player]) => {
          if (!players[id]) {
            players[id] = player;
          } else if (player.ratingsByFormat?.ODI_40) {
            players[id] = {
              ...players[id],
              ratingsByFormat: {
                ...players[id].ratingsByFormat,
                ODI_40: player.ratingsByFormat.ODI_40,
              },
            };
          }
        });
        nextCatalog = {
          ...catalog,
          players,
          formats: {
            ...catalog.formats,
            ODI_40: bundledSquadCatalog.formats.ODI_40,
          },
        };
      }
      dispatch({ type: "SET_TEAM_CATALOG", payload: nextCatalog });
    }
  } catch (error) {
    // The bundled catalog remains available when offline or before the
    // server copy has been uploaded.
  }
};

export default loadSquadCatalog;
