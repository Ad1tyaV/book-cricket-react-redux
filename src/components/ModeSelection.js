import React from "react";
import { Button, Card, CardContent, Typography } from "@material-ui/core";

function ModeSelection({ onSelectMode }) {
  const modes = [
    {
      title: "Quick Match",
      description: "Build two XIs and jump straight into a one-off match.",
      action: "Play Quick Match",
      mode: "quick",
      icon: "⚡",
    },
    {
      title: "Bilateral Series",
      description: "Play a 3, 5, or 7-match series with cumulative stats.",
      action: "Start Series",
      mode: "bilateral",
      icon: "↔",
    },
    {
      title: "Tournament",
      description: "Run groups, playoffs, standings, and a final.",
      action: "Start Tournament",
      mode: "tournament",
      icon: "🏆",
    },
  ];

  return (
    <div className="mode-grid">
      {modes.map((item) => (
        <Card className="mode-card" key={item.mode}>
          <CardContent style={{ padding: 26 }}>
            <div className="mode-icon">{item.icon}</div>
            <Typography
              variant="h5"
              style={{ color: "whitesmoke", marginBottom: 10 }}
            >
              {item.title}
            </Typography>
            <Typography
              variant="body2"
              style={{ color: "#9db0b8", marginBottom: 24, minHeight: 40 }}
            >
              {item.description}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => onSelectMode(item.mode)}
            >
              {item.action}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default ModeSelection;
