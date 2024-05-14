import React, { useState } from 'react';
import { Info, Filter } from '../components';
import { Btn } from '../components/ui';
import '../assets/css/Employees.css';
import { Outlet, Link, useLoaderData } from 'react-router-dom';
// import httpClient from '../services/httpClient';

export default function Employees() {
  const {employees, employeeFields} = useLoaderData();
  // const [employeeInfo, setEmployeeInfo] = useState(null);
  const [active, setActive] = useState(null);

  function handleClick(e) {
    if (active === e.target.id) {
      setActive(null);
      // setEmployeeInfo(null);
    } else {
      setActive(e.target.id);
      // getEmployee(e.target.id);
    }
  }

  // async function getEmployee(employee_id) {
  //   try {
  //     const response = await httpClient.get(`/employees/${employee_id}`);
  //     setEmployeeInfo(response.data);
  //   } catch (err) {
  //     console.log('erro: ', err);
  //   }
  // }

  return (
    <>
      <div className="new-employee">
        <Link to='add-employee'>
          <Btn text="Add Employee" />
        </Link>
      </div>
      <Filter />
      <Outlet />
      <section className="employees-container">
        <ul>
          {
            employees.map(employee => 
              <li
                id={employee.id}
                key={employee.id}
                onClick={handleClick}
              >
                {
                  employee.id === active ? (
                  <Info
                      fields={employeeFields}
                      obj_id={employee.id}
                      path='employees'
                    />
                  ) : (
                    employee.id
                  )
                }
              </li>
            )
          }
        </ul>
      </section>
    </>
  );
}
