import React from 'react';
import { Link, Outlet, } from 'react-router-dom';
import { Btn } from '../components/ui';

export default function EmployeeLeaves() {
  return (
    <>
      <Outlet />
      <div className="new-employee">
        <Link to='request-leave'>
          <Btn text="Request Leave" />
        </Link>
      </div>
    </>
  );
}
