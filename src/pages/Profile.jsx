import { React, useState, useEffect } from 'react'
import { useLoaderData, Form } from 'react-router-dom';
import '../assets/css/Profile.css';
import { AllFields } from '../components';
import { getAllFields } from '../services/fieldService';

const currentUser = localStorage.getItem('currentUser');
const company_id = JSON.parse(currentUser)?.company_id;

export default function Profile() {
  const [fields, setFields] = useState([]);
  const employee_info = useLoaderData();

  useEffect(() => {
    const fetchFields = async () => {
      const data = await getAllFields('employee', company_id);
      setFields(data);
    }
    fetchFields();
  }, []);

  return (
    <Form className='form-preview'>
      <AllFields fields={fields} data={employee_info} />
      <button type='button' id='cancel'>cancel</button>
      <button type='submit'>Submit</button>
    </Form>
  )
}
