import { useState } from "react";
import { Forms } from './MainForm'
import { signInWithEmail, auth } from "../../../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const LoginForm = (form) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading, error] = useAuthState(auth);

  const handleSubmit = () => {
    signInWithEmail(email, password);
  }

  return (
    <>
      <h2 onClick={() => console.log(user)}>Login</h2>
      <div className='login-form' onSubmit={handleSubmit}>
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

        <button onClick={handleSubmit}>Sign In </button>
      </div>
      <p>Don't have an account? <span style={{color: "blue", cursor: "pointer"}} onClick={() => {form.setForm(Forms.Register)}}> Sign up </span></p>
    </>
  )
}