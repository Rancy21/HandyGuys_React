import React from 'react'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router';
import Login from '../pages/Login';
import Home from '../pages/Home';


const router = createBrowserRouter([
{
    path: '/',
    element: <App />,
},{
    path: '/login',
    element: <Login />,
},{
    path: '/home',
    element: <Home />,
}
]);

export default router;