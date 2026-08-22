import { render, screen } from "@testing-library/react";
import FallOfWickets from "./FallOfWickets";

test("fall of wickets shows score, batter, and over for each dismissal", () => {
  render(
    <FallOfWickets
      battingXI={[{ name: "Opener" }, { name: "Number Three" }]}
      dismissals={[
        {
          wicketNumber: 1,
          batterIndex: 0,
          score: 34,
          ball: 32,
        },
        {
          wicketNumber: 2,
          batterIndex: 1,
          score: 70,
          ball: 61,
        },
      ]}
    />
  );

  expect(screen.getByText(/1-34 \(Opener, 5\.2 ov\)/)).toBeInTheDocument();
  expect(
    screen.getByText(/2-70 \(Number Three, 10\.1 ov\)/)
  ).toBeInTheDocument();
});
