import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';



const card = (
  <Box>
    <CardContent >
    <Typography> Chalukya Express</Typography>

      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        12345
      </Typography>
      <Box>
            <Typography variant="h5">
                Arrival : Pune ( Xyz Station )
            </Typography>
            <Typography variant="h5">
                Departure : Katpadi, Vellore
            </Typography>
        </Box>
      
    </CardContent>
    <CardActions>
      <Button size="small">Select This as your Travel</Button>
    </CardActions>
  </Box>
);

function Cards() {

  // fetch travels top 5/6 travels from database and then show them in card

  


  return (
    <Box 
      height={200}
      width={400}
      my={4}
      mx = {3}
    >
      <Card variant="outlined">{card}</Card>
        
    </Box>
  )
}

export default Cards;