import { React } from 'react';
import '../assets/css/Profile.css';
import { ProfileInfo } from '../components';
import { useLoaderData,  Await } from 'react-router-dom';

export default function Profile() {
  const  { employeeFields, employee } = useLoaderData();

  return (
      <Await>
        <ProfileInfo
          fields={employeeFields}
          employee={employee}
        />
      </Await>
  )
}
