import React from 'react';
import { Link, Outlet, useLoaderData } from 'react-router-dom';
import { Btn } from '../components/ui';

export default function Trainings() {
  const trainings = useLoaderData();

  return (
    <>
    <Outlet />
    <div className="new-employee">
      <Link to='add-training'>
        <Btn text="create training" />
      </Link>
    </div>
    <section className="employees-container">
        <ul>
          {trainings.map(training => (
            <li key={training.id}>
              <div className="main-info">
                <span>
                  {training.title}
                </span>
                <div>
                  {training.description}
                </div>
              </div>
            </li>
          ))}
        </ul>
    </section>
    </>
  );
}
