import React, { useState } from 'react';
import { Info, Filter } from '../components';
import { Btn } from '../components/ui';
import '../assets/css/Employees.css';
import { Outlet, Link, useLoaderData } from 'react-router-dom';
import { Icon } from '@iconify/react';

export default function Employees() {
  const {employees, employeeFields} = useLoaderData();
  const [active, setActive] = useState(null);
  const [show, setShow] = useState(true);

  function handleClick(e) {
    setShow(true);
    if (active === e.target.id) {
      return;
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
                key={employee.id}
                className={show && employee.id === active ? 'show' : 'hide'}
              >
                {
                  employee.id === active ? (
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
                <div className="main-info">
                  <span
                    id={employee.id}
                    onClick={handleClick}
                  >
                    {employee.first_name} {employee.last_name}
                  </span>
                  <div>
                    {employee.position_info.job_title}
                  </div>
                </div>
              </li>
            )
          }
        </ul>
      </section>
    </>
  );
}
