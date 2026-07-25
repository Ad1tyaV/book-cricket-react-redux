import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the cricket game mode selection", () => {
  render(<App />);
  expect(screen.getByText(/cricket 2026/i)).toBeInTheDocument();
  expect(screen.getByText(/play quick match/i)).toBeInTheDocument();
});
