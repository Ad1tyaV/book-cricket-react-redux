const setBatterMindset = (team, batterIndex, mindset) => ({
  type: "SET_BATTER_MINDSET",
  payload: { team, batterIndex, mindset },
});

export default setBatterMindset;
