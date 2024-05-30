import React, { useState } from 'react';
import { Btn } from './ui';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/AddEmployee.css';
import httpClient from '../services/httpClient';


// const companyId = JSON.parse(localStorage.getItem("currentUser"))?.company_id;

export default function RequestLeave() {
  const employee_id = JSON.parse(localStorage.getItem('currentUser')).employee_id;
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
      const response = await httpClient.post(`/employees/${employee_id}/leaves`, formData);
      console.log("response: ", response);
      navigate('/home/my-leaves');
    } catch (err) {
      console.log("error: ", err);
    }
    console.log("request leave: ", data);
  }

  return (
    <div className="add-employee">
      <form onSubmit={handleSubmit}>
        <h2>Request Leave</h2>
        <label>
          <span>leave type *</span>
          <input
            type="text"
            name='leave_type'
            placeholder='type your leave type'
            onChange={handleChange}
            required
            />
        </label>
        <label>
          <span>starting date *</span>
          <input
            type="date"
            name='start_date'
            onChange={handleChange}
            required
            />
        </label>
        <label>
          <span>ending date *</span>
          <input
            type="date"
            name='end_date'
            onChange={handleChange}
            required
            />
        </label>
        <label>
          <span>reason</span>
          <input
            type="text"
            name='reason'
            placeholder='type your vacation reason (optional)'
            onChange={handleChange}
            />
        </label>
        <div className="btns">
          <Link to='/home/my-leaves'>
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
