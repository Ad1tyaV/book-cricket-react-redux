import PickTeams from "./components/PickTeams";
import { Provider } from "react-redux";
import newStore from "./redux-setup/store/";
import { AppBar } from "@material-ui/core";
import { useEffect } from "react";

function App() {
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    document.title = `Cricket ${currentYear}`;
  }, [currentYear]);
  return (
    <Provider store={newStore}>
      <div className="App">
        <AppBar position="static">
          <h2 style={{ alignSelf: "center" }}>{`Cricket ${currentYear}`}</h2>
        </AppBar>
        <PickTeams />
      </div>
    </Provider>
  );
}

export default App;
