import { React } from 'react';
import '../assets/css/Profile.css';
import { AllFields } from '../components';
import { useLoaderData,  Await } from 'react-router-dom';

export default function Profile() {
  const { employee, employeeFields } = useLoaderData();

  return (
      <Await>
        <AllFields
          fields={employeeFields}
          employeeInfo={employee}
        />
      </Await>
  )
}
