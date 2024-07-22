import React, { useState } from 'react';
import { Btn } from './ui';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import '../assets/css/AddEmployee.css';
import httpClient from '../services/httpClient';


export default function AddJob() {
  const company_id = JSON.parse(localStorage.getItem('currentUser'))?.company_id;
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const setJobsList = useOutletContext();

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
      setJobsList(prev => [...prev, response.data]);
      navigate('jobs');
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
          <Link to='jobs'>
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
