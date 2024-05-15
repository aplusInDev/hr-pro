import React, { useState } from 'react';
import { Info, Filter } from '../components';
import { Btn } from '../components/ui';
import '../assets/css/Employees.css';
import { Outlet, Link, useLoaderData } from 'react-router-dom';

export default function Departments() {
  const {departments, departmentsFields} = useLoaderData();
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
        <Link to='add-department'>
          <Btn text="Add Department" />
        </Link>
      </div>
      <Filter />
      <Outlet />
      <section className="employees-container">
        <ul>
          {
            departments.map(department => 
              <li
                id={department.id}
                key={department.id}
                onClick={handleClick}
              >
                {
                  department.id === active ? (
                  <Info
                      fields={departmentsFields}
                      obj_id={department.id}
                      path='departments'
                    />
                  ) : (
                    <span>{department.name}</span>
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
