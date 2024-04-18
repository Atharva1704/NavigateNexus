import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TravelList = ({ commuteCode, depart, arrival }) => {
  const [travelDetails, setTravelDetails] = useState([]); // Initialize as an empty array

  const navigate = useNavigate();
  useEffect(() => {
    const fetchTravelDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/findTravelMate`, {
          params: {
            commuteCode: commuteCode,
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
  }, [commuteCode]);

  return (
    <div>
      <h2>Travel Details for Commute Code: {commuteCode}</h2>

      
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

export default TravelList;
