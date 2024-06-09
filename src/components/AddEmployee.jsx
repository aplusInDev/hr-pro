import React, { useState } from 'react';
import { Btn } from './ui';
import {
  Link, useNavigate, useLoaderData,
  useOutletContext
} from 'react-router-dom';
import '../assets/css/AddEmployee.css';
import httpClient from '../services/httpClient';


const companyId = JSON.parse(localStorage.getItem("currentUser"))?.company_id;

export default function AddEmployee() {
  const setEmployeesLsit = useOutletContext();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const { departments, jobs } = useLoaderData();

  // setData({...data, "department": departments[0], "job_title": jobs[0]});

  function handleChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }
  
  async function handleSubmit(e) {
    e.preventDefault();
    if (!data["job_title"])
      data["job_title"] = jobs[0];
    if (!data["department"])
      data["department"] = departments[0]
    try {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      const response = await httpClient.post(`/add_employee?company_id=${companyId}`, formData);
      setEmployeesLsit(prev => [...prev, response.data]);
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
            {departments.map((department, index) => (
              <option key={index}
                value={department}
                defaultChecked={department === departments[0]}
              >
                {department}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>job title</span>
          <select
            name="job_title"
            id="job_title"
            onChange={handleChange}
          >
            {jobs.map((job, index) => (
              <option key={index}
                value={job}
                defaultChecked={job === jobs[0]}
              >
                {job}
              </option>
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
