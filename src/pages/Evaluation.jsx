import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import '../assets/css/Evaluation.css';
import httpClient from '../services/httpClient';

export default function Evaluation() {
  const loaderData = useLoaderData();
  const navigate = useNavigate();
  const [evaluationData, setEvaluationData] = useState({
    anonimous: false,
  });


  function handleChange(e) {
    if(e.target.name === "anonimous") {
      setEvaluationData({
        ...evaluationData,
        [e.target.name]: Boolean(e.target.value),
      });
    } else {
      setEvaluationData({
        ...evaluationData,
        [e.target.name]: e.target.value,
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const trainingId = loaderData.trainingId;
    const trainee_id = JSON.parse(localStorage.getItem("currentUser"))?.employee_id;
    try {
      await httpClient.post(
        `/evaluation?trainee_id=${trainee_id}&training_id=${trainingId}`, evaluationData);
      navigate('/trainings');
    } catch (err) {
      console.log("err: ", err.response.data.error);
    }
  }

  return (
    <section className='evaluation-container'>
      <span className='close'>
        <Link to='/trainings'>
          <Icon icon="material-symbols-light:close" />
        </Link>
      </span>
      <form
        id="trainingEvaluationForm"
        className='evaluation-form'
        onSubmit={handleSubmit}
      >
        <h2>Evaluate {loaderData.training} Program</h2>

        <label htmlFor="rating">Rating:</label>
        <select
          id="rating" name="score"
          onChange={handleChange}
          required
        >
            <option value="">--Please choose a rating--</option>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
        </select>

        <label htmlFor="comments">Comments</label>
        <textarea
          id="comments" name="feedback"
          rows="4" onChange={handleChange}
        />

        <div className="anonimous-choice">
          <label>anonimous</label>
          <div>
            <label htmlFor='yes'>yes</label>
            <input type="radio"
              id="yes" name='anonimous'
              value={true} onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='no'>no</label>
            <input type="radio"
              id="no" name='anonimous'
              value={false} onChange={handleChange}
              defaultChecked={true}
            />
          </div>
        </div>
        <button type='submit' className='submit-btn'>
          submit
        </button>
      </form>
    </section>
  )
}
