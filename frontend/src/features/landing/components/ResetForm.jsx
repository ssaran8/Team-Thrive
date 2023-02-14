import { useState } from "react";
import { Forms } from './MainForm'
import { signInWithEmail, auth } from "../../../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Checkbox, Box, TextField, FormControl, OutlinedInput, FormHelperText, InputAdornment, InputLabel, IconButton, Button, FormControlLabel, FormGroup } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';



export const ResetForm = (form) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [stayLoggedIn, setStayLoggedIn] = new useState(false);

  const handleSubmit = (e) => {
    e.preventDefault()
    signInWithEmail(email, password);
  }

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleClickStayLoggedIn = (e) => {
    setStayLoggedIn(e => !e)
  }

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  }

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

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
      <FormControl>
        <InputLabel>Password</InputLabel>
        <OutlinedInput
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          value={password}
          onChange={onPasswordChange}
        />
      </FormControl>
      <FormControlLabel control={<Checkbox value={stayLoggedIn} onChange={handleClickStayLoggedIn} />} label="Stay logged in" />
      <Button size='large' variant="contained" type='submit'>Log In</Button>
      <p>Don't have an account? <span style={{color: "blue", cursor: "pointer"}} onClick={() => {form.setForm(Forms.Register)}}> Sign up </span></p>
    </Box>
  )
}