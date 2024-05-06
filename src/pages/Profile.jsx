import { React, useState, useEffect } from 'react'
import { useLoaderData } from 'react-router-dom';
import '../assets/css/Profile.css';
import { AllFields } from '../components';
import { getAllFields } from '../services/fieldService';
import httpClient from '../services/httpClient';

const currentUser = localStorage.getItem('currentUser');
const company_id = JSON.parse(currentUser)?.company_id;
const employee_id = JSON.parse(currentUser)?.employee_id;

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
    setInfo(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await httpClient.put(`http://localhost:5000/api/v1/employees/${employee_id}/info`, info);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
    setIsEditing(false);
  }

  return (
    <form
      className='form-preview'
      onSubmit={handleSubmit}
    >
      <AllFields fields={fields} data={info} onChange={handleChange} disabled={!isEditing} />
      <div>
      {
        isEditing ? (
          <>
            <button
              type='button'
              className='btn'
              onClick={() => {
                setIsEditing(false);
                setInfo(employee_info);
              }}
            >
              cancel
            </button>
            <button 
              type='submit'
              className='submit-btn'
              // onClick={(e) => {
              //   e.preventDefault();
              //   console.log(info);
              // }}
            >
              Submit
            </button>
          </>
        ) : (
          <button
            className='btn'
            type='button'
            onClick={() => {setIsEditing(true);}}
          >
            Edit
          </button>
        )
      }
      </div>
    </form>
  )
}
