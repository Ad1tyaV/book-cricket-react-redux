const initialState = {
  India: {
    "-1": "Rohit Sharma",
    0: "Ishan Kishan",
    1: "Virat Kohli",
    2: "SuryaKumar Yadav",
    3: "Rishabh Pant",
    4: "KL Rahul",
    5: "Hardik Pandya",
    6: "Ravindra Jadeja",
    7: "Shardul Thakur",
    8: "Mohammed Shami",
    9: "Jasprit Bumrah",
    10: "Yuzi Chahal",
  },
  Pakistan: {
    "-1": "Imad Wasim",
    0: "Fakhar Zaman",
    1: "Babar Azam",
    2: "Haider Ali",
    3: "Mohammed Rizwan",
    4: "Iftikhar Ahmed",
    5: "Khushdil Shah",
    6: "Shadab Khan",
    7: "Shaheen Afrid",
    8: "Musa Khan",
    9: "Muhammad Hasnain",
    10: "Yasir Shah",
  },
  Australia: {
    "-1": "Travis Head",
    0: "David Warner",
    1: "Steve Smith",
    2: "Marnus Labuschagne",
    3: "Marcus Stoinis",
    4: "Glenn Maxwell",
    5: "Matthew Wade",
    6: "Pat Cummins",
    7: "Mitchell Starc",
    8: "Adam Zampa",
    9: "Josh Hazelwood",
    10: "Daniel Sams",
  },
  England: {
    "-1": "Jason Roy",
    0: "Jonny Bairstow",
    1: "Joe Root",
    2: "Liam Livingstone",
    3: "Moeen Ali",
    4: "Jos Buttler",
    5: "Chris Woakes",
    6: "Liam Plunkett",
    7: "Jofra Archer",
    8: "Adil Rashid",
    9: "Mark Wood",
    10: "Sam Curran",
  },
  SouthAfrica: {
    "-1": "Quinton De Kock",
    0: "Aiden Markram",
    1: "Temba Bavuma",
    2: "R Van Der Dussen",
    3: "David Miller",
    4: "Heinrich Klaasen",
    5: "Andile Phehlukwayo",
    6: "Kagiso Rabada",
    7: "Anrich Nortje",
    8: "Lungi Ngidi",
    9: "Keshav Maharaj",
    10: "Tabraiz Shamsi",
  },
  NewZealand: {
    "-1": "Martin Guptill",
    0: "Devon Conway",
    1: "Kane Williamson",
    2: "Daryl Mitchel",
    3: "Tom Latham",
    4: "James Neesham",
    5: "Colin de Grandhomme",
    6: "Mitchell Santner",
    7: "Matt Henry",
    8: "Trent Boult",
    9: "Lockie Ferguson",
    10: "Tim Southee",
  },
  WestIndies: {
    "-1": "Evin Lewis",
    0: "Shai Hope",
    1: "Darren Bravo",
    2: "Nicholas Pooran",
    3: "Rovman Powell",
    4: "Andre Russell",
    5: "Jason Holder",
    6: "Alzarri Joseph",
    7: "Sunil Narine",
    8: "Sheldon Cotrell",
    9: "Hayden Walsh Jr",
    10: "Akeal Hosein",
  },
  SriLanka: {
    "-1": "Pathum Nissanka",
    0: "Kusal Mendis",
    1: "Charith Asalanka",
    2: "Danushka Gunathilaka",
    3: "Bhanuka Rajapaksa",
    4: "Dasun Shanaka",
    5: "Wanindu Hasaranga",
    6: "Chamika Karunaratne",
    7: "Maheesh Theekshana",
    8: "Asitha Fernando",
    9: "Dilshan Madushanka",
    10: "Matheesha Pathirana",
  },
};

const getTeams = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TEAM": {
      state = action.payload;
      return state;
    }
    case "GET_TEAM":
      return state;
    default:
      return state;
  }
};

export default getTeams;
