import React, { useState } from 'react';
import { Info, Filter } from '../components';
import { Btn } from '../components/ui';
import '../assets/css/Employees.css';
import { Outlet, Link, useLoaderData } from 'react-router-dom';

export default function Employees() {
  const {employees, employeeFields} = useLoaderData();
  const [active, setActive] = useState(null);

  function handleClick(e) {
    if (active === e.target.id) {
      setActive(null);
    } else {
      setActive(e.target.id);
    }
  }

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
                    <>
                      <span>{employee.first_name} {employee.last_name}</span>
                      <div>{employee.position_info.job_title}</div>
                    </>
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
