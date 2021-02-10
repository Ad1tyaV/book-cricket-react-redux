const initialState={
    "India":{ [-1]:"Rohit Sharma",0:"Shikhar Dhawan",1:"Virat Kohli",2:"Shreyas Iyer",3:"Rishabh Pant",4:"KL Rahul",5:"Hardik Pandya",6:"Ravindra Jadeja",7:"Bhuvneshwar Kumar",8:"Shardul Thakur",9:"Jasprit Bumrah",10:"Yuzi Chahal"},
    "Pakistan":{ [-1]:"Imam-ul-Haq",0:"Fakhar Zaman",1:"Babar Azam",2:"Haider Ali",3:"Mohammed Rizwan",4:"Iftikhar Ahmed",5:"Khushdil Shah",6:"Wahab Riaz",7:"Shaheen Afrid",8:"Musa Khan",9:"Muhammad Hasnain",10:"Yasir Shah"},
    "Australia":{ [-1]:"Aaron Finch",0:"David Warner",1:"Steve Smith",2:"Marnus Labuschagne",3:"Marcus Stoinis",4:"Glenn Maxwell",5:"Alex Carey",6:"Pat Cummins",7:"Mitchell Starc",8:"Adam Zampa",9:"Josh Hazelwood",10:"Daniel Sams"},
    "England":{ [-1]:"Jason Roy",0:"Jonny Bairstow",1:"Joe Root",2:"Eoin Morgan",3:"Ben Stokes",4:"Jos Buttler",5:"Chris Woakes",6:"Liam Plunkett",7:"Jofra Archer",8:"Adil Rashid",9:"Mark Wood",10:"Sam Curran"},
    "SouthAfrica":{ [-1]:"Quinton De Kock",0:"Aiden Markram",1:"Faf Du Plessis",2:"R Van Der Dussen",3:"David Miller",4:"JP Duminy",5:"Temba Bavuma",6:"Andile Phehlukwayo",7:"Chris Morris",8:"Kagiso Rabada",9:"Imran Tahir",10:"Tabraiz Shamsi"},
    "NewZealand":{ [-1]:"Martin Guptill",0:"Henry Nicholls",1:"Kane Williamson",2:"Ross Taylor",3:"Tom Latham",4:"James Neesham",5:"Colin de Grandhomme",6:"Mitchell Santner",7:"Matt Henry",8:"Trent Boult",9:"Lockie Ferguson",10:"Tim Southee"}
    
}

const getTeams=(state=initialState,action)=>{
    switch(action.type){

        case 'GET_TEAM':
            return state;
        default:
            return state;
    }
}

export default getTeams;