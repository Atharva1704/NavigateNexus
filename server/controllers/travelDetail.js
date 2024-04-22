import travelDetail from "../models/travelDetail.js";
import User from "../models/User.js";
// Register User

export const logTravel = async (req,res)=>{
    try{
        console.log("p1");
        const {
            commuteName,
            commuteCode,
            departureDateTime,
            arrivalDateTime
        } = req.body;  // req body is destructured.
        console.log(req.body);
        const newTravelLog = new travelDetail({ 
            commuteName,
            commuteCode,
            departureDateTime,
            arrivalDateTime
        });             // here the User mongoose schema is invoked and hashed password is stored 
        console.log("p5");
        console.log(newTravelLog);
        const savedTravel = await newTravelLog.save(); // this new user is stored in database
        res.status(201).json(savedTravel);

    } catch(err) {
        console.log("p2");
        res.status(500).json({error: err.message, msg:"error in registering"});
    }
}


export const getOne = async (req, res) => {
  try {
    const { code, depart, arrival } = req.query;

    // Check if all three parameters are provided
    if (!code || !depart || !arrival) {
      return res.status(400).json({ msg: "Missing parameters" });
    }

    // First, try to find direct matches
    let travelDetails = await travelDetail.find({ code, depart, arrival });
    
    travelDetails = await travelDetail.find({ code });

    // If still no matches, try to find matches with matching code
    if (!travelDetails || travelDetails.length === 0) {
      travelDetails = await travelDetail.find({ code });
    }
    
    // If no direct matches, try to find matches with matching code and depart
    if (!travelDetails || travelDetails.length === 0) {
      travelDetails = await travelDetail.find({ code, depart });
    }

    // If still no matches, calculate the difference between depart and arrival
    if (!travelDetails || travelDetails.length === 0) {
      const difference = calculateDifference(depart, arrival);
      return res.status(404).json({ msg: "No direct or partial matches found", difference });
    }

    // If matches found, send them in the response
    res.status(200).json(travelDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to calculate the difference between two date-time strings
const calculateDifference = (depart, arrival) => {
  const departTime = new Date(depart).getTime();
  const arrivalTime = new Date(arrival).getTime();
  const differenceInMilliseconds = Math.abs(arrivalTime - departTime);
  const differenceInMinutes = differenceInMilliseconds / (1000 * 60);
  return differenceInMinutes;
};



  export const findMate = async (req, res) => {
    try {
        console.log("FindMate entered!");
        const { id } = req.params;
        console.log(id);
        const travel = await travelDetail.findById(id);
        console.log(travel);

        if (!travel) {
            return res.status(404).json({ error: "Travel data not found" });
        }

        res.json(travel);
    } catch (err) {
        console.error("Error finding travel data:", err);
        res.status(500).json({ error: err.message, msg: "Error in finding person" });
    }
}



// export const getOne = async(req, res) =>{
//     try {

//         const id = req.params.id;
//         const userExist = await travelDetail.findById(id);
//         if(!userExist){
//             return res.status(404).json({msg: "User not found"});
//         }
//         res.status(200).json(userExist);
        
//     } catch (error) {
//         res.status(500).json({error: error});
//     }
// }

// const { travelDetail } = require("../models"); // Import the TravelDetail model
