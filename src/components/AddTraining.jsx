import React, { useState } from 'react';
import { Btn } from './ui';
import {
  Link, useLoaderData,
  useNavigate, useOutletContext,
} from 'react-router-dom';
import '../assets/css/AddEmployee.css';
import httpClient from '../services/httpClient';



export default function AddEmployee() {
  const companyId = JSON.parse(localStorage.getItem("currentUser"))?.company_id;
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const { departments, jobs, employees } = useLoaderData();
  const setTrainingsList = useOutletContext();


  function handleChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }
  
  async function handleSubmit(e) {
    e.preventDefault();
    const optionalFields = ["trainer", "job", "department", "description"];
    optionalFields.forEach((field) => {
      if (field in data && data[field] === "") {
        delete data[field];
      }
    })

    try {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      const response = await httpClient.post(`/companies/${companyId}/trainings`, formData);
      setTrainingsList(prev => [...prev, response.data]);
      navigate('/home/trainings');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="add-employee">
      <form onSubmit={handleSubmit}>
        <label>
          <span>title *</span>
          <input
            type="text"
            name='title'
            placeholder='type training title'
            onChange={handleChange}
            required
            />
        </label>
        <label>
          <span>description (optional)</span>
          <textarea
            name='description'
            placeholder='type training description'
            onChange={handleChange}
          />
        </label>
        <label>
          <span>starting data *</span>
          <input
            type="date"
            name='start_date'
            onChange={handleChange}
            required
            />
        </label>
        <label>
          <span>completion date *</span>
          <input
            type="date"
            name='end_date'
            onChange={handleChange}
            required
            />
        </label>
        <label>
          <span>trainer (optional)</span> 
          <select
            name="trainer"
            id="trainer"
            onChange={handleChange}
          >
            <option value="">select trainer</option>
            {employees.map((trainer, index) => (
              <option key={index}
                value={trainer}
              >
                {trainer}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>department (optional)</span>
          <select
            name="department"
            id="department"
            onChange={handleChange}
          >
            <option value="">select department</option>
            {departments.map((department, index) => (
              <option key={index}
                value={department}
              >
                {department}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>job (optional)</span>
          <select
            name="job"
            id="job"
            onChange={handleChange}
          >
            <option value="">select job</option>
            {jobs.map((job, index) => (
              <option key={index}
                value={job}
              >
                {job}
              </option>
            ))}
          </select>
        </label>
        <div className="btns">
          <Link to='/home/trainings'>
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
