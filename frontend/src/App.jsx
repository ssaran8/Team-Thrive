import React, {useState} from 'react';
import { BrowserRouter, Router, Routes, Route, Link } from 'react-router-dom';

import { AppRoutes } from './routes';


function App() {

  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path='/' element={<LoginPage newuser={RegisterPage} />} />
    //     <Route path='/NewUser' element={<RegisterPage login={LoginPage}/>} />
    //   </Routes>
    // </BrowserRouter>
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
  )
}

export default App;
