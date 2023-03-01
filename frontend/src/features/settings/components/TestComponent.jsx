import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from "@mui/material/Avatar"
 
export const TestComponent = () => {
  return (
    //<div>
    //  <p> hello from TestComponent</p>
    //</div>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label="First name"
        />
        <TextField
          required
          id="outlined-required"
          label="Last name"
        />
      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          label="Email"
        />
        <TextField
          required
          id="outlined-required"
          label="Phone Number"
        />
      </div>

      <div>
      <Stack spacing={2} direction="row">
        <Button variant="contained">Save Changes</Button>
      </Stack>
      </div>
      
    </Box>
  )
}