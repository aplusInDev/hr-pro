import {
  createBrowserRouter,
} from "react-router-dom";
import {
  Login, Register, Profile, CustomForm,
  Employees, Departments, Jobs, Attendance,
  Absences, Leaves, Trainings, Evaluation,
  EmployeeAbsences, ResetPassword, UpdatePassword,
  PrivateRoute, Home, Company,
} from './pages';
import {
  companyLoader, employeesLoader, loginLoader, logoutLoader,
  profileLoader, departmentsLoader, jobsLoader, addEmployeeLoader,
  leavesLoader, addTraingLoader, trainingsLoader, evaluationLoader,
  absencesLoader, employeeAbsencesLoader, rootLoader,
} from './pages/loaders';
import {
  companyAction, loginAction, registerAction,
  updatePasswordAction,
} from './pages/actions';
import { action as ResetPasswordAction } from './pages/ResetPassword';
import {
  AddEmployee, AddDepartment, AddJob,
  RequestLeave, AddTraining,
} from './components';


const router = createBrowserRouter([
  {
    path: "*",
    element: <PrivateRoute />,
    loader: rootLoader,
    children: [
      {
        path: "home",
        element: <Home />
      },
      {
        path: "logout",
        loader: logoutLoader,
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
        path: "update_password",
        element: <UpdatePassword />,
        action: updatePasswordAction,
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
        loader: absencesLoader,
      },
      {
        path: "my_absences",
        element: <EmployeeAbsences />,
        loader: employeeAbsencesLoader,
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
  {
    path: "login",
    element: <Login />,
    loader: loginLoader,
    action: loginAction,
  },
  {
    path: "reset_password",
    element: <ResetPassword />,
    action: ResetPasswordAction,
  },
  {
    path: "register",
    element: <Register />,
    action: registerAction,
  },
]);

export default router;
