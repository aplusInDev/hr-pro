import React, { useState } from 'react';
import { Btn } from './ui';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import '../assets/css/AddEmployee.css';
import httpClient from '../services/httpClient';


export default function AddDepartment() {
  const company_id = JSON.parse(localStorage.getItem('currentUser'))?.company_id;
  const setDepartmentList = useOutletContext();
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
      const response = await httpClient.post(`/companies/${company_id}/departments`, formData);
      setDepartmentList(prev => [...prev, response.data]);
      navigate('departments');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="add-employee">
      <form onSubmit={handleSubmit}>
        <label>
          <span>department name</span>
          <input
            type="text"
            name='name'
            placeholder='type department name'
            onChange={handleChange}
            required
            />
        </label>
        <div className="btns">
          <Link to='departments'>
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
