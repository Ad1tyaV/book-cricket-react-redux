import { render, screen } from "@testing-library/react";
import BilateralSetup from "./BilateralSetup";

test("series setup leaves pitch selection to the per-match setup", () => {
  render(
    <BilateralSetup
      teams={["India", "NewZealand", "Australia"]}
      onStartSeries={() => {}}
      onBack={() => {}}
    />
  );

  expect(screen.getByText("Bilateral Series Setup")).toBeInTheDocument();
  expect(screen.queryByText("Pitch Type")).not.toBeInTheDocument();
});
