import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
// import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { LandingPage, Login, Register, Profile } from './pages';
import { loader as rootLoader } from './pages/Profile';
import { action as profileAction } from './pages/Profile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "profile",
    element: <Profile />,
    loader: rootLoader,
  },
  {
    path: "logout",
    action: profileAction,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
