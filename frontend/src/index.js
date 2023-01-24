import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import LoginPage from './pages/loginPage';
import CalendarPage from './pages/calendarPage';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
//  /*
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/Calendar' element={<CalendarPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
//  */

  //<h1> Thrive CSE 403 Coming Soon</h1>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
