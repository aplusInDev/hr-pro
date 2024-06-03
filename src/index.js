import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import './assets/css/App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {
  LandingPage, Login, Register, Profile, CustomForm,
  Home, Employees, Departments, Jobs, Attendance,
  Absences, Forbidden, Leaves, EmployeeLeaves,
  Trainings,
} from './pages';
import {
  companyLoader, employeesLoader, loginLoader, logoutLoader,
  profileLoader, departmentsLoader, jobsLoader, addEmployeeLoader,
  employeeLeavesLoader,
  leavesLoader,
  addTraingLoader,
  trainingsLoader,
  evaluationLoader,
} from './pages/loaders';
import { action as loginAction } from './pages/Login';
import {action as registerAction } from './pages/Register';
import { Company } from './components/ui';
import { companyAction } from './pages/actions';
import homeLoader from './pages/loaders/homeLader';
import { AddEmployee, AddDepartment, AddJob, RequestLeave, AddTraining } from './components';
import Evaluation from './pages/Evaluation';

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
  },
  {
    path: "register",
    element: <Register />,
    action: registerAction,
  },
  {
    path: "logout",
    loader: logoutLoader,
  },
  {
    path: "/home",
    element: <Home />,
    loader: homeLoader,
    children: [
      {
        path: "forbidden",
        element: <Forbidden />,
      },
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
        element: <Departments />,
        loader: departmentsLoader,
        children: [
          {
            path: 'add-department',
            element: <AddDepartment />
          },
        ]
      },
      {
        path: "jobs",
        element: <Jobs />,
        loader: jobsLoader,
        children: [
          {
            path: 'add-job',
            element: <AddJob />
          },
        ]
      },
      {
        path: "employees",
        element: <Employees />,
        loader: employeesLoader,
        children: [
          {
            path: 'add-employee',
            element: <AddEmployee />,
            loader: addEmployeeLoader,
          },
        ]
      },
      {
        path: "attendance",
        element: <Attendance />,
      },
      {
        path: "absences",
        element: <Absences />,
        loader: employeesLoader,
      },
      {
        path: "leaves",
        element: <Leaves />,
        loader: leavesLoader,
        children: [
          {
            path: 'request-leave',
            element: <RequestLeave />,
          }
        ]
      },
      {
        path: "my-leaves",
        element: <EmployeeLeaves />,
        loader: employeeLeavesLoader,
        children: [
          {
            path: 'request-leave',
            element: <RequestLeave />,
          }
        ]
      },
      {
        path: "trainings",
        element: <Trainings />,
        loader: trainingsLoader,
        children: [
          {
            path: 'add-training',
            element: <AddTraining />,
            loader: addTraingLoader,
          }
        ]
      },
      {
        path: "evaluation/:trainingId",
        element: <Evaluation />,
        loader: evaluationLoader,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
