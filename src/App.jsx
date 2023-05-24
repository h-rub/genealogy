import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import './css/style.scss';

import Dashboard from './pages/Dashboard';
import Signin from './pages/Signin';


//PRIVATE ROUTE AND PUBLIC ROUTE
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]);

  return (
    <>
    <Routes>
      <Route
            exact
            // path='mp-pro/'
            path='/'
            element={
              <PublicRoute>
                <Dashboard />
              </PublicRoute>
            }
      />

      <Route
            path='/signin'
            element={
              <PublicRoute>
                <Signin />
              </PublicRoute>
            }
      />

    </Routes>
      
    </>
  )
}

export default App
