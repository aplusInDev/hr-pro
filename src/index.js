import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { LandingPage, Login, Register, Profile, ErrorPage } from './pages';
import { loader as rootLoader } from './pages/Profile';
import { action as logoutAction } from './layouts/Header';
import { action as loginAction } from './pages/Login';
import {action as registerAction } from './pages/Register';
import { loader as landingPageLoader } from './pages/LandingPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    loader: landingPageLoader,
  },
  {
    path: "login",
    element: <Login />,
    action: loginAction,
    errorElement: <ErrorPage />,
  },
  {
    path: "register",
    element: <Register />,
    action: registerAction,
    errorElement: <ErrorPage />,
  },
  {
    path: "profile",
    element: <Profile />,
    loader: rootLoader,
  },
  {
    path: "logout",
    action: logoutAction,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
