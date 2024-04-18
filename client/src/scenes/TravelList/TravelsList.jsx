import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Code } from "@mui/icons-material";

const TravelsList = () => {

  const { id } = useParams();
  
  console.log(id);

  const [travelDetails, setTravelDetails] = useState([]); // Initialize as an empty array
  const [travelData, setTravelData] = useState({});
  const [code, setCode] = useState("");
  const [change, setChange] = useState(false);
  const [depart, setDepart] = useState("");
  const [arrival, setArrival] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTravelData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/travels/${id}`);
        setTravelData(response.data);
        // console.log(response.data);
        // console.log(travelData);
        // setCode(data.code);
        
    } catch (error) {
        console.error('Error fetching travel data:', error);
    }
    };

    fetchTravelData();
  },[id]);
    
//   }, [id]);
  
useEffect(() => {
  // This useEffect will run whenever travelData changes
  console.log(travelData.commuteCode);
  setCode(travelData.commuteCode);
  setDepart(travelData.departureDateTime);
  setArrival(travelData.arrivalDateTime);
  setChange(true);
  const fetchTravelDetails = async () => {
    try {
        
        console.log("hi");
        const response = await axios.get(`http://localhost:3001/findTravelMate`, {
          params: {
            code: code,
            depart: depart,
            arrival: arrival
          }
        });
        console.log(response.data);
        setTravelDetails(response.data); // Set the array of travel details
      } catch (error) {
        console.error("Error fetching travel details:", error);
      }
    };
  
    fetchTravelDetails();
}, [travelData]);

    useEffect(()=>{
        console.log(code);
        console.log(depart);
        console.log(arrival);
        
        // console.log(code);
    },[depart]);


  return (
    <div>
        <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
        marginBottom: '20px', // Adjust margin bottom as needed
      }}
    >
      <Typography variant="h3" sx={{ marginBottom: 2 }}>Travel Mates</Typography>

      <Typography variant="h4" sx={{ marginBottom: 1 }}>
        Departure Time: {new Date(depart).toLocaleString()}
      </Typography>

      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Arrival Time: {new Date(arrival).toLocaleString()}
      </Typography>

      <Typography variant="h3" sx={{ marginBottom: 2 }}>Travel Details for Commute Code: {code}</Typography>
    </Box>


      
      {travelDetails.length > 0 ? (
        <div>
          <Typography variant="h3">Travel Mates</Typography>
          <Box>
            {travelDetails.map((detail, index) => {
              // Convert departureDateTime string to Date object
              const departureDate = new Date(detail.departureDateTime);
              // Extract individual components for departureDateTime
              const departureYear = departureDate.getFullYear();
              const departureMonth = departureDate.getMonth() + 1;
              const departureDay = departureDate.getDate();
              const departureHour = departureDate.getHours();
              const departureMinute = departureDate.getMinutes();

              // Convert arrivalDateTime string to Date object
              const arrivalDate = new Date(detail.arrivalDateTime);
              // Extract individual components for arrivalDateTime
              const arrivalYear = arrivalDate.getFullYear();
              const arrivalMonth = arrivalDate.getMonth() + 1;
              const arrivalDay = arrivalDate.getDate();
              const arrivalHour = arrivalDate.getHours();
              const arrivalMinute = arrivalDate.getMinutes();

              return (
                <Box 
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        flexDirection: 'row',
                        padding: 2,
                        margin: 2,
                        borderRadius: 4,
                        border: "1px solid grey",
                        marginBottom: 2,
                    }}
                    key={index}
                >
                    <Box
                    >
                        <h2> Travel Mate: {index + 1}</h2>
                        <Typography variant="h3">
                            Departure: {departureDay}-{departureMonth}-{departureYear} {departureHour}:{departureMinute}
                        </Typography>

                        <Typography variant= 'h3'>
                            Arrival: {arrivalDay}-{arrivalMonth}-{arrivalYear} {arrivalHour}:{arrivalMinute}
                        </Typography>
                    </Box>
                    <Button onClick={()=>{
                        navigate("/chat-room")
                    }} variant="text"> Message them! </Button>
                </Box>
              );
            })}
          </Box>
        </div>
      ) : (
        <p>No travel details found</p>
      )}
    </div>
  );
};

export default TravelsList;
