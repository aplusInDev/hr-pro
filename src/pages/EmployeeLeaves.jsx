import React from 'react';
import { Link, Outlet, useLoaderData } from 'react-router-dom';
import { Btn } from '../components/ui';

export default function EmployeeLeaves() {
  const leaves = useLoaderData();

  console.log(leaves)
  return (
    <>
      <Outlet />
      <div className="new-employee">
        <Link to='request-leave'>
          <Btn text="Request Leave" />
        </Link>
      </div>
      <section className="employees-container employee-leaves">
        <ul>
          {leaves.map(leave => 
            <li key={leave.id}>
              <div className="main-info">
                <span>
                  {leave.leave_type}
                </span>
                <span>
                  {leave.duration}
                </span>
                <span>
                  {leave.status}
                </span>
                <div>
                  {leave.start_date} - {leave.end_date}
                </div>
              </div>
            </li>
          )}
        </ul>
      </section>
    </>
  );
}
