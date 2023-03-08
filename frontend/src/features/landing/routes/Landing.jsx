import { Box, Typography } from "@mui/material"
import { MainForm } from "../components/MainForm"

// Thrive Landing Page.
export const Landing = () => {

  return (
    <Box 
      sx={{
        bgcolor: 'rgba(91, 235, 190, 0.42)',
      }}
    >
      <Box sx={{height: '100%', width: '60%', right: 0, position: 'absolute', display: 'flex', justifyContent: 'left', alignItems: 'center'}}>
        <Typography variant="h1" mr={15} ml={15}>
          Thrive
        </Typography>
      </Box>
      <MainForm />
    </Box>
  )
}