import PickTeams from "./components/PickTeams";
import { Provider } from "react-redux";
import newStore from "./redux-setup/store/";
import { AppBar } from "@material-ui/core";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.title = "Cricket 2021";
  }, []);
  return (
    <Provider store={newStore}>
      <div className="App">
        <AppBar position="static">
          <h2 style={{ alignSelf: "center" }}>Cricket 2021</h2>
        </AppBar>
        <PickTeams />
      </div>
    </Provider>
  );
}

export default App;
