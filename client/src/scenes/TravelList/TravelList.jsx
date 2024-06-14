import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../navbar";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';




const TravelList = () => {

  const { id } = useParams();
  const [commuteCode, setcommuteCode] = useState()
  const [depart, setDepart] = useState('')
  const [arrival, setArrival] = useState('')
  const [commuteName, setCommuteName] = useState('');

  // fetch your own Details 
  useEffect(() => {
    const fetchYourTravelDetails = async () => {
      try {
        console.log("P10");
        const res = await axios.get(`http://localhost:3001/travels/${id}`);
        setcommuteCode(res.data.commuteCode);
        setDepart(res.data.departureDateTime);
        setArrival(res.data.arrivalDateTime);
        setCommuteName(res.data.commuteName);
        

      } catch (err) {
        console.error(err); // Log error for debugging
      } 
    };

    fetchYourTravelDetails();
    setCheck(!check);
   
  }, [id]);


  const [travelDetails, setTravelDetails] = useState([]); // Initialize as an empty array
  const [check, setCheck] = useState(false);
  useEffect(() => {
    const findTravelMate = async () => {
      try {
        console.log("P11");
        
        if (arrival && depart && commuteCode) { 
          console.log("insides")
          const url = `http://localhost:3001/travels?arrival=${arrival}&depart=${depart}&commuteCode=${commuteCode}`;
  
          const res = await axios.get(url);
          console.log(res);
        }
        
      } catch (err) {
        console.error(err); // Log error for debugging
      } 
    };
    findTravelMate();


  }, [check, arrival, depart, commuteCode]);

  const navigate = useNavigate();


  // card function to show user Details
  const card = (
    <Box>
      <CardContent >
      <Typography> {commuteName} </Typography>
  
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {commuteCode}
        </Typography>
        <Box>
              <Typography variant="h5">
                  Arrival : {arrival}
              </Typography>
              <Typography variant="h5">
                  Departure : {depart}
              </Typography>
          </Box>
        
      </CardContent>
      <CardActions>
        <Button size="small">Select This as your Travel</Button>
      </CardActions>
    </Box>
  );

  return (
    <Box>
      <Navbar />
      <Box 
        my={3}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h2"> Your Travel Details!</Typography>
        <Box 
          height={200}
          width={400}
          my={4}
          mx = {3}
        >
          <Card variant="outlined">{card}</Card>
            
        </Box>
        
        
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
    </Box>
  );
};

export default TravelList;
