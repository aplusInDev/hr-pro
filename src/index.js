import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { LandingPage, Login, Register, Profile, ErrorPage } from './pages';
import { companyLoader, loginLoader, logoutLoader, profileLoader } from './pages/loaders';
import { action as loginAction } from './pages/Login';
import {action as registerAction } from './pages/Register';
import { Company } from './components/ui';
import { companyAction } from './pages/actions';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "login",
    element: <Login />,
    loader: loginLoader,
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
    loader: profileLoader,
    children: [
      {
        path: "company",
        element: <Company />,
        loader: companyLoader,
        action: companyAction,
      }
    ]
  },
  {
    path: "logout",
    loader: logoutLoader,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
