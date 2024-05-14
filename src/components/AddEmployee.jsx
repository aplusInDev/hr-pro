import React, { useState } from 'react';
import { Btn } from './ui';
import { Link, useNavigate, useLoaderData } from 'react-router-dom';
import '../assets/css/AddEmployee.css';
import httpClient from '../services/httpClient';

export default function AddEmployee() {
  const [data, setData] = useState({role: 'employee'});
  const navigate = useNavigate();
  const { departments, jobs } = useLoaderData();

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
      const response = await httpClient.post('/add_employee', formData);
      console.log(response);
      navigate('/home/employees');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="add-employee">
      <form onSubmit={handleSubmit}>
        <label>
          <span>first name</span>
          <input
            type="text"
            name='first_name'
            placeholder='type employee email'
            onChange={handleChange}
            required
            />
        </label>
        <label>
          <span>last name</span>
          <input
            type="text"
            name='last_name'
            placeholder='type employee email'
            onChange={handleChange}
            required
            />
        </label>
        <label>
          <span>email</span>
          <input
            type="email"
            name='email'
            placeholder='type employee email'
            onChange={handleChange}
            required
            />
        </label>
        <label>
            <span>role</span>
          <select
            name="role"
            id="role"
            defaultValue='employee'
            onChange={handleChange}
          >
            <option value="hr">hr</option>
            <option value="employee">employee</option>
          </select>
        </label>
        <label>
          <span>department</span>
          <select
            name="department"
            id="department"
            onChange={handleChange}
          >
            {departments.map((job, index) => (
              <option key={index} value={job}>{job}</option>
            ))}
          </select>
        </label>
        <label>
          <span>job title</span>
          <select
            name="job title"
            id="job title"
            onChange={handleChange}
          >
            {jobs.map((job, index) => (
              <option key={index} value={job}>{job}</option>
            ))}
          </select>
        </label>
        <div className="btns">
          <Link to='/home/employees'>
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
