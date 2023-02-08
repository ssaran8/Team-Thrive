import { useState } from "react";
import { Forms } from './MainForm'
import { signUpWithEmail, auth } from "../../../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const RegisterForm = (form) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    signUpWithEmail(email, password)
  }

  return (
    <>
      <h2>Register</h2>
      <div className='login-form'>
        <label htmlFor="email">Email</label>
        <input type="email"
          placeholder="NETid@uw.edu"
          id="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)} />

        <label htmlFor="password">Password</label>
        <input type="password"
          placeholder="********"
          id="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)} />
        
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="Confirm Password"
          placeholder="********"
          id="confirmPassword"
          name="confirmPassword"
          value={password}
          onChange={e => setPassword(e.target.value)} />

        <button onClick={handleSubmit}>Sign Up </button>
      </div>
      <p>Already have an account? <span style={{color: "blue", cursor: "pointer"}} onClick={() => {form.setForm(Forms.Login)}}> Sign in </span></p>
    </>
  )
}