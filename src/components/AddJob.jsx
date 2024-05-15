import React, { useState } from 'react';
import { Btn } from './ui';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/AddEmployee.css';
import httpClient from '../services/httpClient';

const company_id = JSON.parse(localStorage.getItem('currentUser'))?.company_id;

export default function AddJob() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  function handleChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }
  
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      const response = await httpClient.post(`/companies/${company_id}/jobs`, formData);
      console.log(response);
      navigate('/home/jobs');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="add-employee">
      <form onSubmit={handleSubmit}>
        <label>
          <span>job title</span>
          <input
            type="text"
            name='title'
            placeholder='type job title'
            onChange={handleChange}
            required
            />
        </label>
        <div className="btns">
          <Link to='/home/departments'>
            <Btn text="cancel" />
          </Link>
          <button
            type='submit'
            className='submit-btn'
          >
            submit
          </button>
        </div>
      </form>
    </div>
  );
}