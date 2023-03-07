import { useState } from 'react'

import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'
import { ForgotForm } from './ForgotForm'
import { ResetForm } from './ResetForm'
import Box from '@mui/material/Box';
import { Typography } from '@mui/material'

export const Forms = {
  Login: 'Login',
  Register: 'Register',
  Forgot: 'Forgot',
  Reset: 'Reset',
}

const FormComponents = {
  Login: LoginForm,
  Register: RegisterForm,
  Forgot: ForgotForm,
  Reset: ResetForm,
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
        minWidth: '500px',
      }}
    >
      <FormComponent form={form} setForm={setForm} />
    </Box>
  )
}