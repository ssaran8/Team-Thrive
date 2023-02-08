import { useState } from 'react'

import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'

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
    <div>
      <h1> Thrive </h1>
        <FormComponent form={form} setForm={setForm} />
    </div>
  )
}