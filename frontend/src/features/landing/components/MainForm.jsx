import { useState } from 'react'

import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'
import Box from '@mui/material/Box';

export const Forms = {
  Login: 'Login',
  Register: 'Register'
}

const FormComponents = {
  Login: LoginForm,
  Register: RegisterForm,
}


export const MainForm = () => {
  const [form, setForm] = useState(Forms.Login)
  
  let FormComponent = FormComponents[form]

  return (
    <Box        
      sx={{
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        p: 0,
        width: '38%',
        height: '100vh',
      }}
    >
      <h1> Thrive </h1>
      <FormComponent form={form} setForm={setForm} />
    </Box>
  )
}