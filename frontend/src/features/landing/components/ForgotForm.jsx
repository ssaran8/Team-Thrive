import { useState } from "react";
import { Forms } from './MainForm'
import { signInWithEmail, auth } from "../../../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Checkbox, Box, TextField, FormControl, OutlinedInput, FormHelperText, InputAdornment, InputLabel, IconButton, Button, FormControlLabel, FormGroup } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';



export const ForgotForm = (form) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  }

  return (
    <Box
      component='form'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        '& .MuiFormControl-root': { marginTop: 1, marginBottom: 1 },
        width: '60%',
        alignSelf: 'center',
        p: 10,
        marginTop: '20%'
      }}
      onSubmit={handleSubmit}
    >
      <h2> Log In </h2>
      <FormControl>
        <InputLabel>Email</InputLabel>
        <OutlinedInput
          type='text'
          label="Email"
          value={email}
          onChange={onEmailChange}
        />
      </FormControl>
      <Button size='large' variant="contained" type='submit'>Log In</Button>
      <p>Don't have an account? <span style={{color: "blue", cursor: "pointer"}} onClick={() => {form.setForm(Forms.Register)}}> Sign up </span></p>
    </Box>
  )
}