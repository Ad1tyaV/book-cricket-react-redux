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
      dispatch({ type: "SET_TEAM_CATALOG", payload: catalog });
    }
  } catch (error) {
    // The bundled catalog remains available when offline or before the
    // server copy has been uploaded.
  }
};

export default loadSquadCatalog;
