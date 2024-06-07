import React, { useState } from 'react';
import { Info } from '../components';
import { Btn } from '../components/ui';
import '../assets/css/Employees.css';
import { Outlet, Link, useLoaderData } from 'react-router-dom';

export default function Jobs() {
  const {jobs, jobsFields} = useLoaderData();
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
              <li
                id={job.id}
                key={job.id}
                onClick={handleClick}
              >
                {
                  job.id === active ? (
                  <Info
                      fields={jobsFields}
                      obj_id={job.id}
                      path='jobs'
                    />
                  ) : (
                    <span>{job.title}</span>
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
