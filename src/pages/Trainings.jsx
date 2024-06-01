import React, { useState } from 'react';
import { Link, Outlet, useLoaderData } from 'react-router-dom';
import { Btn } from '../components/ui';
import { Icon } from '@iconify/react';
import httpClient from '../services/httpClient';

export default function Trainings() {
  const {trainings, employees} = useLoaderData();
  const [activeTrainingId, setActiveTrainingId] = useState(null);
  const [trainees, setTrainees] = useState({});
  const [nonTrainees, setNonTrainees] = useState([]);
  const [addedTrainees, setAddedTrainees] = useState([]);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);


  function handleClick(id) {
    if(id === activeTrainingId) {
      console.log("already active");
      return;
    } else {
      const traineesNames = Object.keys(trainings.find(training => training.id === id).trainees);
      setActiveTrainingId(id);
      setTrainees(trainings.find(training => training.id === id).trainees);
      setNonTrainees(employees.filter(employee => !traineesNames.includes(employee)));
      console.log('new active id');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setUploading(true);
    const formData = new FormData();
    formData.append('trainees', JSON.stringify(addedTrainees));
    try {
      const response = await httpClient.post(`/trainings/${activeTrainingId}/trainees`, formData);
      setUploading(false);
      setAddedTrainees([]);
      setTrainees(response.data.trainees);
      setNonTrainees(employees.filter(employee => !Object.keys(response.data.trainees).includes(employee)));
    } catch (err) {
      setUploading(false);
      setError("Failed to add trainees. Please try again.");
      setTimeout(() => {
        setError(null);
      }, 5*1000);
    }
  }

  return (
    <>
    <Outlet />
    <div className="new-employee">
      <Link to='add-training'>
        <Btn text="create training" />
      </Link>
    </div>
    <section className="employee-leaves">
        <ul>
        {trainings.map(training => (
          <li key={training.id}
            className={training.id === activeTrainingId ? 'active' : ''}
          >
            <div className="main-info">
              {uploading && <p>Uploading...</p>}
              {error && <p className='error'>{error}</p>}
              <p className='training-title'
                onClick={() => {
                  handleClick(training.id);
                }}
              >
                <span>title</span>
                <span>{training.title}</span>
              </p>
              <p>
                <span>description</span>
                <span>{training.description}</span>
              </p>
            </div>
            {training.id === activeTrainingId && (<>
              <span
                className='close'
                onClick={() => setActiveTrainingId(null)}
              >
                <Icon icon="material-symbols-light:close" />
              </span>
              <div className="details">
                <div className="trainees">
                  {addedTrainees.length > 0 && <form className="added-trainees"
                    onSubmit={handleSubmit}
                  >
                    <h1>Added Trainees</h1>
                    {addedTrainees.map((employee) => (
                      <div key={employee}>
                        <span>{employee}</span>
                        <span
                          className='remove'
                          onClick={() => {
                            setAddedTrainees(addedTrainees.filter(emp => emp !== employee));
                            setNonTrainees([...nonTrainees, employee]);
                          }}
                        >
                          <Icon icon="material-symbols-light:close" />
                        </span>
                      </div>
                    ))}
                    <div className="btns">
                      <Btn text="cancel"
                        onClick={() => {
                          setAddedTrainees([]);
                          setNonTrainees(employees);
                        }}
                      />
                      <button type='submit'
                        className='submit-btn'
                      >
                        save
                      </button>
                    </div>
                  </form>}
                  <h1>Trainees</h1>
                  <ul>
                  {Object.keys(trainees).map((employee) => (
                    <li key={employee}>
                      <p>{employee}</p>
                    </li>
                  ))}
                  </ul>
                </div>
                <div className="non-trainees">
                  <h1>Non Trainees</h1>
                  <ul>
                  {nonTrainees.map(employee => (
                    <li key={employee}>
                      <span>{employee}</span>
                      <span className='add'
                        onClick={() => {
                          const addedTraineesSet = new Set([...addedTrainees, employee]);
                          setAddedTrainees([...addedTraineesSet]);
                          setNonTrainees(nonTrainees.filter(emp => emp !== employee));
                        }}
                      >
                        add
                      </span>
                    </li>
                  ))}
                  </ul>
                </div>
              </div>
          </>)}
          </li>
        ))}
        </ul>
    </section>
    </>
  );
}
