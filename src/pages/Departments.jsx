import React, { useState } from 'react';
import { Info } from '../components';
import { Btn } from '../components/ui';
import '../assets/css/Employees.css';
import { Outlet, Link, useLoaderData } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';

export default function Departments() {
  const {departments, departmentsFields} = useLoaderData();
  const [activeId, setActiveId] = useState(null);
  const [show, setShow] = useState(false);
  const [departmentList, setDepartmentList] = useState(departments);

  function handleChangeId(id) {
    setShow(true);
    if(activeId === id) {
      return
    } else {
      setActiveId(id);
    }
  }

  return (
    <>
      <div className="new-employee">
        <Link to='add-department'>
          <Btn text="Add Department" />
        </Link>
      </div>
      <Outlet context={setDepartmentList} />
      <section className="employees-container">
        <ul>
          {
            departmentList.map(department => 
              <li key={department.id}
                className={"main-item " + (
                  show && department.id === activeId ? 'active' : 'hide'
                )}
              >
                <div className="main-info">
                  <span
                    onClick={() => handleChangeId(department.id)}
                  >
                    {department.name}
                  </span>
                </div>
                {
                  department.id === activeId ? (
                    <>
                      <span
                        className='close'
                        onClick={() => setShow(false)}
                      >
                        <Icon icon="material-symbols-light:close" />
                      </span>
                      <Info
                        fields={departmentsFields}
                        obj_id={department.id}
                        path='departments'
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
