import { React } from 'react';
import '../assets/css/Profile.css';
import { AllFields } from '../components';
import { useLoaderData,  Await } from 'react-router-dom';

const employee_id = JSON.parse(localStorage.getItem("currentUser"))?.employee_id;

export default function Profile() {
  const  { employeeFields } = useLoaderData();

  return (
      <Await>
        <AllFields
          fields={employeeFields}
          employee_id={employee_id}
        />
      </Await>
  )
}
