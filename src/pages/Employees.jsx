import React, { useState } from 'react';
import { Info } from '../components';
import { Btn } from '../components/ui';
import '../assets/css/Employees.css';
import { Outlet, Link, useLoaderData } from 'react-router-dom';
import { Icon } from '@iconify/react';

export default function Employees() {
  const {employees, employeeFields} = useLoaderData();
  const [activeId, setActive] = useState(null);
  const [show, setShow] = useState(false);
  const [employeesList, setEmployeesLsit] = useState(employees);

  function handleClick(id) {
    setShow(true);
    if (activeId === id) {
      return;
    } else {
      setActive(id);
    }
  }

  return (
    <>
      <div className="new-employee">
        <Link to='add-employee'>
          <Btn text="Add Employee" />
        </Link>
      </div>
      <Outlet context={setEmployeesLsit} />
      <section className="employees-container">
        <ul>
          {employeesList.map(employee => 
            <li
              key={employee.id}
              className={"main-item " + (
                show && employee.id === activeId ? 'active' : 'hide'
              )}
            >
              <div className="main-info">
                <span
                  id={employee.id}
                  onClick={() => handleClick(employee.id)}
                  >
                  {employee.first_name} {employee.last_name}
                </span>
                <div>
                  {employee.position_info.job_title}
                </div>
              </div>
              {employee.id === activeId ? (
                <>
                  <span
                    className='close'
                    onClick={() => setShow(false)}
                  >
                    <Icon icon="material-symbols-light:close" />
                  </span>
                  <Info
                      fields={employeeFields}
                      obj_id={employee.id}
                      path='employees'
                    />
                </>
                ) : (
                  null
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
