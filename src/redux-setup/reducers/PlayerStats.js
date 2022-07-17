const newstate = {
  India: {
    [0]: {
      name: "Virat Kohli",
      batting: { attacking: 90, defence: 90, concentration: 95 },
      bowling: { skill: 40, concentration: 50, pace: 70, accuracy: 55 },
    },
    [1]: {
      name: "Rohit Sharma",
      batting: { attacking: 90, defence: 90, concentration: 90 },
      bowling: { skill: 40, concentration: 40, pace: 60, accuracy: 40 },
    },
    [2]: {
      name: "Shikhar Dhawan",
      batting: { attacking: 85, defence: 85, concentration: 85 },
      bowling: { skill: 0, concentration: 0, pace: 0, accuracy: 0 },
    },
    [3]: {
      name: "Shreyas Iyer",
      batting: { attacking: 85, defence: 80, concentration: 80 },
      bowling: { skill: 80, concentration: 80, pace: 60, accuracy: 75 },
    },
    [4]: {
      name: "Manish Pandey",
      batting: { attacking: 87, defence: 85, concentration: 82 },
      bowling: { skill: 40, concentration: 40, pace: 60, accuracy: 40 },
    },
    [5]: {
      name: "Rishabh Pant",
      batting: { attacking: 90, defence: 75, concentration: 80 },
      bowling: { skill: 0, concentration: 0, pace: 0, accuracy: 0 },
    },
    [6]: {
      name: "KL Rahul",
      batting: { attacking: 90, defence: 80, concentration: 82 },
      bowling: { skill: 0, concentration: 0, pace: 0, accuracy: 0 },
    },
    [7]: {
      name: "Shubman Gill",
      batting: { attacking: 85, defence: 80, concentration: 80 },
      bowling: { skill: 20, concentration: 20, pace: 60, accuracy: 25 },
    },
    [8]: {
      name: "Ravindra Jadeja",
      batting: { attacking: 92, defence: 75, concentration: 84 },
      bowling: { skill: 80, concentration: 80, pace: 64, accuracy: 85 },
    },
    [9]: {
      name: "Hardik Pandya",
      batting: { attacking: 95, defence: 75, concentration: 84 },
      bowling: { skill: 75, concentration: 76, pace: 84, accuracy: 70 },
    },
    [10]: {
      name: "Shardul Thakur",
      batting: { attacking: 70, defence: 55, concentration: 55 },
      bowling: { skill: 80, concentration: 80, pace: 86, accuracy: 80 },
    },
    [11]: {
      name: "Bhuvneshwar Kumar",
      batting: { attacking: 60, defence: 70, concentration: 55 },
      bowling: { skill: 87, concentration: 87, pace: 85, accuracy: 90 },
    },
    [12]: {
      name: "Jasprit Bumrah",
      batting: { attacking: 60, defence: 50, concentration: 55 },
      bowling: { skill: 90, concentration: 90, pace: 90, accuracy: 96 },
    },
    [13]: {
      name: "Mohammed Shami",
      batting: { attacking: 40, defence: 40, concentration: 55 },
      bowling: { skill: 85, concentration: 85, pace: 87, accuracy: 87 },
    },
    [14]: {
      name: "Yuzi Chahal",
      batting: { attacking: 40, defence: 40, concentration: 40 },
      bowling: { skill: 85, concentration: 85, pace: 60, accuracy: 85 },
    },
    [15]: {
      name: "Kuldeep Yadav",
      batting: { attacking: 40, defence: 40, concentration: 40 },
      bowling: { skill: 80, concentration: 80, pace: 60, accuracy: 85 },
    },
    [16]: {
      name: "Navdeep Saini",
      batting: { attacking: 40, defence: 40, concentration: 40 },
      bowling: { skill: 80, concentration: 80, pace: 95, accuracy: 75 },
    },
  },
  England: {},
};

const PlayerStats = (state = newstate, action) => {
  return state;
};
