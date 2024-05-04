import { React, useState, useEffect } from 'react'
import { useLoaderData } from 'react-router-dom';
import '../assets/css/Profile.css';
import { AllFields } from '../components';
import { getAllFields } from '../services/fieldService';

const currentUser = localStorage.getItem('currentUser');
const company_id = JSON.parse(currentUser)?.company_id;

export default function Profile() {
  const employee_info = useLoaderData();
  const [fields, setFields] = useState([]);
  const [info, setInfo] = useState(employee_info);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchFields = async () => {
      const data = await getAllFields('employee', company_id);
      setFields(data);
    }
    fetchFields();
  }, []);

  fields?.forEach(field => {
    if(!info[field.name]) {
      if (field.type === 'checkbox') {
        setInfo({
          ...info,
          [field.name] : [field.default_value],
        })
      }
      else {
        setInfo({
          ...info,
          [field.name]: field.default_value
        });
      }
    }
  })

  function handleChange(data) {
    setIsEditing(true);
    setInfo(data);
    console.log(data);
  }

  return (
    <form className='form-preview'>
      <AllFields fields={fields} data={info} onChange={handleChange} />
      <button
        type='button'
        disabled={!isEditing}
      >
        cancel
      </button>
      <button 
        type='submit'
        disabled={!isEditing}
      >
        Submit
      </button>
    </form>
  )
}
