import React from 'react'
import App from './App.jsx'
import { Routes, Route } from "react-router";
import { createBrowserRouter } from 'react-router';
import Login from '../src/pages/Login.jsx';
import Home from './Pages/Home.jsx';


const router = () => {
    return (
      <div>
  
        {/* Routes */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    );
}
// createBrowserRouter([
// {
//     path: '/',
//     element: <App />,
// },{
//     path: '/login',
//     element: <Login />,
// },{
//     path: '/home',
//     element: <Home />,
// }
// ]);

export default router;