import squadCatalog from "../../data/cric-vfinal.json";
import pickTeams from "./pickTeams";

const selectTeams = (format, overs) => {
  const dispatch = jest.fn();
  const getState = () => ({ getTeams: squadCatalog });

  pickTeams("India", "England", overs, format)(dispatch, getState);
  return dispatch.mock.calls[0][0].payload;
};

test("T20 matches select the T20 player profiles", () => {
  const payload = selectTeams("T20", 20);

  expect(payload.team1PlayingXI).toHaveLength(11);
  expect(payload.team1PlayingXI[0].name).toBe("Abhishek Sharma");
  expect(payload.team1PlayingXI[0]).toEqual(
    expect.objectContaining({
      batting: expect.any(Number),
      attacking: expect.any(Number),
      bowling: expect.any(Number),
    })
  );
});

test("40- and 50-over matches share the ODI player profiles", () => {
  const odi40 = selectTeams("ODI_40", 40);
  const odi50 = selectTeams("ODI_50", 50);

  expect(odi40.team1PlayingXI).toEqual(odi50.team1PlayingXI);
  expect(odi50.team1PlayingXI[0].name).toBe("Shubman Gill");
  expect(odi50.team2PlayingXI[2].name).toBe("Joe Root");
});
