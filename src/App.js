import PickTeams from "./components/PickTeams";
import { Provider, useDispatch } from "react-redux";
import newStore from "./redux-setup/store/";
import { AppBar } from "@material-ui/core";
import { useEffect } from "react";
import loadSquadCatalog from "./redux-setup/actions/loadSquadCatalog";

function SquadCatalogLoader() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSquadCatalog());
  }, [dispatch]);

  return null;
}

function App() {
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    document.title = `Cricket ${currentYear}`;
  }, [currentYear]);
  return (
    <Provider store={newStore}>
      <SquadCatalogLoader />
      <div className="App">
        <AppBar position="static" className="app-bar">
          <div className="brand">
            <span className="brand-mark">6</span>
            <div>
              <strong>{`Cricket ${currentYear}`}</strong>
              <small>Pick your XI. Shape the match.</small>
            </div>
          </div>
        </AppBar>
        <PickTeams />
      </div>
    </Provider>
  );
}

export default App;
