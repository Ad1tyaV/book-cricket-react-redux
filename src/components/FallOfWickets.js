import React from "react";
import { formatOvers } from "../helpers/matchResultHelper";
import { getPlayerName } from "../helpers/teamHelpers";

function FallOfWickets({ dismissals = [], battingXI = [] }) {
  if (dismissals.length === 0) {
    return <p style={{ color: "#888" }}>No wickets fallen</p>;
  }

  return (
    <p style={{ color: "#bbb", lineHeight: 1.8 }}>
      {dismissals.map((dismissal, index) => (
        <React.Fragment
          key={`${dismissal.wicketNumber}-${dismissal.batterIndex}`}
        >
          {index > 0 && " · "}
          {dismissal.wicketNumber}-{dismissal.score} (
          {getPlayerName(battingXI[dismissal.batterIndex])},{" "}
          {formatOvers(dismissal.ball)} ov)
        </React.Fragment>
      ))}
    </p>
  );
}

export default FallOfWickets;
