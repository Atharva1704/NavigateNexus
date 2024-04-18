import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Forms from "./Forms.jsx";

export const TravelDetails = () => {
  return (
    <Box
      my={4}
      display="flex"
      alignItems="center"
      flexDirection="column"
      gap={4}
      p={2}
      sx={{ }}
    >
        <Typography
            variant='h2'
        >Fill your travel Details</Typography>
        <Box
            width={800}
        >
            <Forms />
        </Box>
    </Box>

  ) 
}


export default TravelDetails;


