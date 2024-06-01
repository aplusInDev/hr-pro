import React, { useState } from 'react';
import { Link, Outlet, useLoaderData } from 'react-router-dom';
import { Btn } from '../components/ui';
import { Icon } from '@iconify/react/dist/iconify.js';

export default function Trainings() {
  const trainings = useLoaderData();
  const [activeTrainingId, setActiveTrainingId] = useState(null);


  function handleClick(id) {
    if(id === activeTrainingId) {
      console.log("already active");
      return;
    } else {
      setActiveTrainingId(id);
      console.log('new active id');
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
                  <h1>Trainees</h1>
                  <ul>
                  {trainees.map(trainee => (
                    <li key={Object.keys(trainee)[0]}>
                      <p>{Object.keys(trainee)[0]}</p>
                    </li>
                  ))}
                  </ul>
                </div>
                <div className="non-trainees">
                  <h1>Non Trainees</h1>
                  <ul>
                  {nonTrainees.map(employee => (
                    <li key={Object.keys(employee)[0]}>
                      <p>{Object.keys(employee)[0]}</p>
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


const trainees = [
  {"aplus1 test": "0123456"},
  {"aplus2 test": "1123456"},
  {"aplus3 test": "2123456"},
  {"aplus4 test": "3123456"},
];

const employees = [
  {"aplus1 test": "0123456"},
  {"aplus2 test": "1123456"},
  {"aplus3 test": "2123456"},
  {"aplus4 test": "3123456"},
  {"aplus5 test": "4123456"},
  {"aplus6 test": "5123456"},
  {"aplus7 test": "6123456"},
  {"aplus8 test": "7123456"},
  {"aplus9 test": "8123456"},
];

// convert trainees to a lookup object
const traineesLokkup = trainees.reduce((acc, trainee) => {
  const key = Object.keys(trainee)[0];
  acc[key] = true;
  return acc;
}, {});

// filter employees that are not trainees
const nonTrainees = employees.filter(employee => {
  const key = Object.keys(employee)[0];
  return !traineesLokkup[key];
});
