import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import './assets/css/App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { LandingPage, Login, Register, Profile, ErrorPage, CustomForm, Home, Employees } from './pages';
import { companyLoader, loginLoader, logoutLoader, profileLoader } from './pages/loaders';
import { action as loginAction } from './pages/Login';
import {action as registerAction } from './pages/Register';
import { Company } from './components/ui';
import { companyAction } from './pages/actions';
import homeLoader from './pages/loaders/homeLader';
import { AddEmployee } from './components';

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
      },
      {
        path: "departments",
        element: <Employees />,
      },
      {
        path: "employees",
        element: <Employees />,
        children: [
          {
            path: 'add-employee',
            element: <AddEmployee />
          },
        ]
      },
      {
        path: "attendance",
        element: <Employees />,
      },
      {
        path: "leaves",
        element: <Employees />,
      },
      {
        path: "salaries",
        element: <Employees />,
      },
      {
        path: "vacancies",
        element: <Employees />,
      },
      {
        path: "training",
        element: <Employees />,
      },
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
