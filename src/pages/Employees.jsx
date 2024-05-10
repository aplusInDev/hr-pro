import React from 'react';
import { Filter } from '../components';
import { Btn } from '../components/ui';
import '../assets/css/Employees.css';

export default function Employees() {
  return (
    <div className="employees">
      <div className="add-employee">
        <Btn
          text="Add Employee"
          onClick={() => {console.log("adding employee")}}
        />
      </div>
      <Filter />
    </div>
  );
}
