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
    console.log("hi"); // Enclosed "hi" in quotes
    const { code, depart, arrival } = req.query;

    console.log(depart);
    console.log(arrival);
    
    const travelDetails = await travelDetail.find({ code });
  
    if (!travelDetails || travelDetails.length === 0) {
      return res.status(404).json({ msg: "Travel details not found" });
    }
  
    res.status(200).json(travelDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
