import React, { useState, useRef } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { connect } from "react-redux";
import pickTeams from "../redux-setup/actions/pickTeams";
import { Button } from "@material-ui/core";
import { SwapVert } from "@material-ui/icons";
import MatchComponent from "./MatchComponent";
import ModeSelection from "./ModeSelection";
import TournamentSetup from "./TournamentSetup";
import BilateralSetup from "./BilateralSetup";
import TournamentManager from "./TournamentManager";
import BilateralManager from "./BilateralManager";

function PickTeams(props) {
  const [openTeam1, setOpenTeam1] = useState(false);
  const [openTeam2, setOpenTeam2] = useState(false);
  const [pitchToggle, setpitchToggle] = useState(false);
  const [firstTeam, setFirstTeam] = useState("India");
  const [secondTeam, setSecondTeam] = useState("NewZealand");
  const pitchTypes = ["Normal", "Hard", "Wet", "Green", "Dusty"];
  const [selectedPitch, setSelectedPitch] = useState("Normal");
  const [selectedOvers, setSelectedOvers] = useState(50);
  const [oversToggle, setOversToggle] = useState(false);
  const [gameMode, setGameMode] = useState(null); // null, 'quick', 'bilateral', 'tournament'
  const [tournamentConfig, setTournamentConfig] = useState(null);
  const [bilateralConfig, setBilateralConfig] = useState(null);
  const oversOptions = [
    { value: 20, label: "T20 (20 Overs)", format: "T20" },
    { value: 40, label: "ODI (40 Overs)", format: "ODI_40" },
    { value: 50, label: "ODI (50 Overs)", format: "ODI_50" },
  ];
  const teams = useRef([
    "India",
    "Pakistan",
    "Australia",
    "England",
    "SouthAfrica",
    "NewZealand",
    "WestIndies",
    "SriLanka",
    "Afghanistan",
  ]);
  const handleChangeFirstTeam = (event) => {
    setFirstTeam(event.target.value);
  };

  const handleChangeSecondTeam = (event) => {
    setSecondTeam(event.target.value);
  };

  const handleClose = () => {
    setOpenTeam1(false);
  };

  const handleOpen = () => {
    setOpenTeam1(true);
  };

  const handleClose2 = () => {
    setOpenTeam2(false);
  };

  const handleOpen2 = () => {
    setOpenTeam2(true);
  };

  const handleModeSelect = (mode) => {
    setGameMode(mode);
  };

  const handleStartTournament = (config) => {
    setTournamentConfig(config);
    setGameMode('tournamentActive');
  };

  const handleStartSeries = (config) => {
    setBilateralConfig(config);
    setGameMode('bilateralActive');
  };

  const handleExitMode = () => {
    setGameMode(null);
    setTournamentConfig(null);
    setBilateralConfig(null);
  };

  // Tournament mode active
  if (gameMode === 'tournamentActive' && tournamentConfig) {
    return <TournamentManager config={tournamentConfig} onExit={handleExitMode} />;
  }

  // Bilateral mode active
  if (gameMode === 'bilateralActive' && bilateralConfig) {
    return <BilateralManager config={bilateralConfig} onExit={handleExitMode} />;
  }

  // Tournament setup
  if (gameMode === 'tournament') {
    return (
      <TournamentSetup 
        teams={teams.current} 
        onStartTournament={handleStartTournament}
        onBack={() => setGameMode(null)}
      />
    );
  }

  // Bilateral setup
  if (gameMode === 'bilateral') {
    return (
      <BilateralSetup 
        teams={teams.current} 
        onStartSeries={handleStartSeries}
        onBack={() => setGameMode(null)}
      />
    );
  }

  // Mode selection screen
  if (!gameMode && props.scoreData.team1 === "") {
    return <ModeSelection onSelectMode={handleModeSelect} />;
  }

  return (
    <div>
      {props.scoreData.team1 === "" ? (
        <>
          <div style={{ marginLeft: "47.5%", marginTop: "1%" }}>
            <InputLabel shrink id="firstTeam" style={{ color: "whitesmoke" }}>
              First Team
            </InputLabel>
            <Select
              label="First Team"
              labelId="demo-controlled-open-select-label"
              id="firstTeam"
              open={openTeam1}
              onClose={handleClose}
              onOpen={handleOpen}
              value={firstTeam}
              onChange={handleChangeFirstTeam}
              style={{ color: "whitesmoke" }}
              key={firstTeam}
            >
              {teams.current.map((team) =>
                team !== secondTeam ? (
                  <MenuItem value={team} key={team}>
                    {team}
                  </MenuItem>
                ) : (
                  []
                )
              )}
            </Select>
            <br />
            <br />
            <span style={{ color: "white", fontSize: "0.70rem" }}>Switch</span>
            <SwapVert
              htmlColor="white"
              onClick={() => {
                setFirstTeam(secondTeam);
                setSecondTeam(firstTeam);
              }}
            />
            <br />
            <br />
            <InputLabel shrink id="secondTeam" style={{ color: "whitesmoke" }}>
              Second Team
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="secondTeam"
              open={openTeam2}
              onClose={handleClose2}
              onOpen={handleOpen2}
              value={secondTeam}
              onChange={handleChangeSecondTeam}
              style={{ color: "whitesmoke" }}
              key={secondTeam}
            >
              {teams.current.map((team) =>
                team !== firstTeam ? (
                  <MenuItem value={team} key={team}>
                    {team}
                  </MenuItem>
                ) : (
                  []
                )
              )}
            </Select>
            <br />
            <br />
            <InputLabel shrink id="pitchType" style={{ color: "whitesmoke" }}>
              Pitch Type
            </InputLabel>
            <Select
              label="Pitch Type"
              labelId="demo-controlled-open-select-label"
              id="pitchType"
              open={pitchToggle}
              onClose={() => {
                setpitchToggle(false);
              }}
              onOpen={() => {
                setpitchToggle(true);
              }}
              value={selectedPitch}
              onChange={(event) => {
                setSelectedPitch(event.target.value);
              }}
              style={{ color: "whitesmoke" }}
              key={selectedPitch}
            >
              {pitchTypes.map((pitch) => (
                <MenuItem value={pitch} key={pitch}>
                  {pitch}
                </MenuItem>
              ))}
            </Select>
            <br />
            <br />
            <InputLabel shrink id="oversType" style={{ color: "whitesmoke" }}>
              Overs
            </InputLabel>
            <Select
              label="Overs"
              labelId="demo-controlled-open-select-label"
              id="oversType"
              open={oversToggle}
              onClose={() => {
                setOversToggle(false);
              }}
              onOpen={() => {
                setOversToggle(true);
              }}
              value={selectedOvers}
              onChange={(event) => {
                setSelectedOvers(event.target.value);
              }}
              style={{ color: "whitesmoke" }}
              key={selectedOvers}
            >
              {oversOptions.map((option) => (
                <MenuItem value={option.value} key={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            <br />
            <br />
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                const selectedFormat =
                  oversOptions.find((opt) => opt.value === selectedOvers)
                    ?.format || "ODI_50";
                props.pickTeamDispatch(
                  firstTeam,
                  secondTeam,
                  selectedOvers,
                  selectedFormat
                );
              }}
            >
              PLAY
            </Button>
            <br />
            <br />
            <Button
              variant="outlined"
              style={{ color: "whitesmoke" }}
              onClick={() => setGameMode(null)}
            >
              Back to Mode Selection
            </Button>
          </div>
        </>
      ) : (
        <MatchComponent pitchType={selectedPitch} />
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    scoreData: state.manageScores,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    pickTeamDispatch: (team1, team2, overs, format) =>
      dispatch(pickTeams(team1, team2, overs, format)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PickTeams);
