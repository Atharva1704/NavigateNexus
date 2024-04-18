import mongoose from "mongoose";

const travelSchema = new mongoose.Schema(
    {
        commuteName:{
            type: String,
            required: true,
            min:2,
            max:50
        },
        commuteCode:{
            type: String,
            required: true,
            min:2,
            max:50
        },
        departureDateTime: {
            type: Date,
            required: true
        },
        arrivalDateTime: {
            type: Date,
            required: true
        },
        
    },{
        timestamps:true,
    }
);
const travelDetail = mongoose.model("travelDetail", travelSchema);
export default travelDetail;
