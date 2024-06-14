import { Box, Typography } from '@mui/material'
import React from 'react'
import Cards from '../../components/Card/Cards'

function PopularTravels() {
    
  return (
    <Box 
        display="flex"
        alignItems="center"
        flexDirection="column"
        my = {4}
    >
        <Typography variant='h2'>
            PopularTravels
        </Typography>
        <Cards />
    </Box>
  )
}

export default PopularTravels