import React from 'react';
import { Filter } from '../components';
import { Btn } from '../components/ui';
import '../assets/css/Employees.css';
import { Outlet, Link } from 'react-router-dom';

export default function Employees() {
  return (
    <div className="employees">
      <div className="new-employee">
        <Link to='add-employee'>
          <Btn text="Add Employee" />
        </Link>
      </div>
      <Filter />
      <Outlet />
    </div>
  );
}
