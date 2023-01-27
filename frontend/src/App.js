import React, {useState} from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage newuser={RegisterPage} />} />
        <Route path='/NewUser' element={<RegisterPage login={LoginPage}/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
