import { fireEvent, render, screen } from "@testing-library/react";
import SquadSelector from "./SquadSelector";
import squadCatalog from "../data/cric-vfinal.json";
import { getDefaultXI } from "../helpers/teamHelpers";

test("squad editor stays collapsed and swaps an XI player with a reserve", () => {
  const onChange = jest.fn();
  render(
    <SquadSelector
      team="India"
      teamData={squadCatalog}
      format="ODI_50"
      value={getDefaultXI(squadCatalog, "India", "ODI_50")}
      onChange={onChange}
    />
  );

  expect(screen.queryByText("Reserves")).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Change India XI" }));

  fireEvent.click(screen.getByLabelText("Select Shubman Gill to swap out"));
  fireEvent.click(
    screen.getByLabelText("Select Harshit Rana to bring into the XI")
  );
  fireEvent.click(
    screen.getByRole("button", {
      name: "Swap Shubman Gill for Harshit Rana",
    })
  );

  expect(screen.getByLabelText("Move Harshit Rana down")).toBeInTheDocument();
  expect(onChange.mock.calls.at(-1)[0]).toHaveLength(11);
  expect(onChange.mock.calls.at(-1)[0][0].name).toBe("Harshit Rana");
});
