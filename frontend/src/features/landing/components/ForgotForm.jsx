import { useState } from "react";
import { Forms } from './MainForm'
import { signInWithEmail, auth } from "../../../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Checkbox, Box, TextField, FormControl, OutlinedInput, FormHelperText, InputAdornment, InputLabel, IconButton, Button, FormControlLabel, FormGroup } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';



export const ForgotForm = ({setForm}) => {
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
        '& .MuiFormControl-root .MuiButtonBase-root': { m: 1 },
        '> *': {m: 1},
        width: '60%',
        alignSelf: 'center',
        p: 1,
        marginTop: '20%'
      }}
      onSubmit={handleSubmit}
    >
      <h2> Forgot Password </h2>
      <p> We will send a link to the email below to reset your password </p>
      <FormControl>
        <InputLabel>Email</InputLabel>
        <OutlinedInput
          type='text'
          label="Email"
          value={email}
          onChange={onEmailChange}
        />
      </FormControl>
      <Button size='large' variant="contained" type='submit'>Send Email</Button>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <p>Back to <span style={{color: "blue", cursor: "pointer"}} onClick={() => {setForm(Forms.Login)}}> Log In </span></p>
      </div>    
    </Box>
  )
}