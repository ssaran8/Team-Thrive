import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';



//  const[currentForm, setCurrentForm] = useState('login');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
//  /*
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage newuser={RegisterPage} />} />
        <Route path='/NewUser' element={<RegisterPage login={LoginPage}/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
