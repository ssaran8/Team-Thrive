import React, {useEffect, useState} from 'react';
import { BrowserRouter, Router, Routes, Route, Link } from 'react-router-dom';

import { AppRoutes } from './routes';

// Renders overall application
function App() {
  return (
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
  )
}

export default App;
