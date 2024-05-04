import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { LandingPage, Login, Register, Profile, ErrorPage, CustomForm, Home } from './pages';
import { companyLoader, loginLoader, logoutLoader, profileLoader } from './pages/loaders';
import { action as loginAction } from './pages/Login';
import {action as registerAction } from './pages/Register';
import { Company } from './components/ui';
import { companyAction } from './pages/actions';
import homeLoader from './pages/loaders/homeLader';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/home",
    element: <Home />,
    loader: homeLoader,
    children: [
      {
        path: "profile",
        element: <Profile />,
        loader: profileLoader,
      },
      {
        path: "company",
        element: <Company />,
        loader: companyLoader,
        action: companyAction,
      },
      {
        path: "forms_settings",
        element: <CustomForm />,
      }
    ],
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
