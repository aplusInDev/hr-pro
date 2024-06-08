import React, { useState } from 'react';
import { Info } from '../components';
import { Btn } from '../components/ui';
import '../assets/css/Employees.css';
import { Outlet, Link, useLoaderData } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';

export default function Jobs() {
  const {jobs, jobsFields} = useLoaderData();
  const [activeId, setActiveId] = useState(null);
  const [show, setShow] = useState(false);

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
        <Link to='add-job'>
          <Btn text="Add Job" />
        </Link>
      </div>
      {/* <Filter /> */}
      <Outlet />
      <section className="employees-container">
        <ul>
          {
            jobs.map(job => 
              <li key={job.id}
                className={show && job.id === activeId ? 'active' : 'hide'}
              >
                <div className="main-info">
                  <span
                    onClick={() => handleChangeId(job.id)}
                  >
                    {job.title}
                  </span>
                </div>
                {job.id === activeId && (
                  <>
                    <span className="close"
                      onClick={() => setShow(false)}
                    >
                      <Icon icon="material-symbols-light:close" />
                    </span>
                    <Info
                      fields={jobsFields}
                      obj_id={job.id}
                      path='jobs'
                    />
                  </>
                )}
              </li>
            )
          }
        </ul>
      </section>
    </>
  );
}
