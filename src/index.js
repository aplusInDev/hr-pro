import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Alert } from './components/ui';
import { LandingPage, Login, Register, Profile, ErrorPage } from './pages';
import { loader as rootLoader } from './pages/Profile';
import { action as profileAction } from './pages/Profile';
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
    children: [
      {
        path: "forbidden",
        element: <ErrorPage
          msg="Account not activated"
        />,
      },
    ],
  },
  {
    path: "register",
    element: <Register />,
    action: registerAction,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "created",
        element: <Alert
          title="account created"
          body="visit your email and activate your account"
        /> 
      }
    ]
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
