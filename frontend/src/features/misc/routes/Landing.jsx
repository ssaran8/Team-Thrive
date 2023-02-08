import { React, Component, useState } from 'react';
// import './loginPage.css'
import { Link } from 'react-router-dom'

export const Landing = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    alert('Submit')
  }

  
  return (
    <div className='login-container'>
      <h2>Login</h2>
      <form className='login-form' onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email"
          placeholder="NETid@uw.edu"
          id="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.value)} />

        <label htmlFor="password">Password</label>
        <input type="password"
          placeholder="********"
          id="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.value)} />

        <button type="sumbit">Log In </button>
      </form>
      <Link className="link-btn" to='/NewUser'>Don't have an account? Sign Up</Link>
    </div>
  )

}