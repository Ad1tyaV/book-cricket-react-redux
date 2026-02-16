import React from "react";
import { Button, Card, CardContent, Typography } from "@material-ui/core";

function ModeSelection({ onSelectMode }) {
  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      minHeight: "60vh",
      gap: "20px",
      flexWrap: "wrap",
      padding: "20px"
    }}>
      <Card style={{ width: 300, backgroundColor: "#1e1e1e" }}>
        <CardContent>
          <Typography variant="h5" style={{ color: "whitesmoke", marginBottom: 10 }}>
            Quick Match
          </Typography>
          <Typography variant="body2" style={{ color: "#aaa", marginBottom: 20 }}>
            Play a single match between two teams
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth
            onClick={() => onSelectMode("quick")}
          >
            Play Quick Match
          </Button>
        </CardContent>
      </Card>

      <Card style={{ width: 300, backgroundColor: "#1e1e1e" }}>
        <CardContent>
          <Typography variant="h5" style={{ color: "whitesmoke", marginBottom: 10 }}>
            Bilateral Series
          </Typography>
          <Typography variant="body2" style={{ color: "#aaa", marginBottom: 20 }}>
            Play a series between two teams
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth
            onClick={() => onSelectMode("bilateral")}
          >
            Start Series
          </Button>
        </CardContent>
      </Card>

      <Card style={{ width: 300, backgroundColor: "#1e1e1e" }}>
        <CardContent>
          <Typography variant="h5" style={{ color: "whitesmoke", marginBottom: 10 }}>
            Tournament
          </Typography>
          <Typography variant="body2" style={{ color: "#aaa", marginBottom: 20 }}>
            Play a full tournament with standings and playoffs
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth
            onClick={() => onSelectMode("tournament")}
          >
            Start Tournament
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default ModeSelection;
