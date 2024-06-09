import React, { useState } from 'react';
import { Link, Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import { Btn } from '../components/ui';
import { Icon } from '@iconify/react';
import httpClient from '../services/httpClient';

export default function Trainings() {
  const role = JSON.parse(localStorage.getItem("currentUser"))?.role;
  const {trainings, employees} = useLoaderData();
  const [activeTrainingId, setActiveTrainingId] = useState(null);
  const [trainees, setTrainees] = useState({});
  const [nonTrainees, setNonTrainees] = useState([]);
  const [addedTrainees, setAddedTrainees] = useState([]);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [deletetedTrainees, setDeletedTrainees] = useState({});
  const [showEvaluation, setShowEvaluation] = useState(null);
  const navigate = useNavigate();


  function handleAdd(employee) {
    const addedTraineesSet = new Set([...addedTrainees, employee]);
    setDeletedTrainees({});
    setAddedTrainees([...addedTraineesSet]);
    setNonTrainees(nonTrainees.filter(emp => emp !== employee));
  }

  function handleRemove(employee) {
    setAddedTrainees(addedTrainees.filter(emp => emp !== employee));
    setNonTrainees([...nonTrainees, employee]);
  }

  function handleCancel() {
    setAddedTrainees([]);
    setNonTrainees(employees);
  }

  function handleAddDeleted(trainee) {
    setAddedTrainees([]);
    setDeletedTrainees({...deletetedTrainees, [trainee]: trainees[trainee]});
    delete trainees[trainee];
  }

  function handleRemoveDeleted(trainee) {
    setTrainees({...trainees, [trainee]: deletetedTrainees[trainee]});
    delete deletetedTrainees[trainee];
  }

  function handleCancelDeleted() {
    setTrainees({...trainees, ...deletetedTrainees})
    setDeletedTrainees({});
  }

  function handleClick(id) {
    if(id === activeTrainingId || role === "employee") {
      return;
    } else {
      const traineesNames = Object.keys(trainings.find(training => training.id === id).trainees);
      setShowEvaluation(null);
      setActiveTrainingId(id);
      setTrainees(trainings.find(training => training.id === id).trainees);
      setNonTrainees(employees.filter(employee => !traineesNames.includes(employee)));
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

  async function handleSubmitDeleted(e) {
    e.preventDefault();
    setUploading(true);
    const formData = new FormData();
    formData.append('trainees', JSON.stringify(Object.keys(deletetedTrainees)));
    try {
      const response = await httpClient.delete(`/trainings/${activeTrainingId}/trainees`, {data: formData});
      setDeletedTrainees({});
      setTrainees(response.data.trainees);
      setNonTrainees(employees.filter(employee => !Object.keys(response.data.trainees).includes(employee)));
    } catch (err) {
      setError("Failed to delete trainees. Please try again");
      setTimeout(() => {
        setError(null);
      }, 5*1000);
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
    <Outlet />
    {role !== "employee" && (
      <div className="new-employee">
        <Link to='add-training'>
          <Btn text="create training" />
        </Link>
      </div>
    )}
    <section className="employee-leaves">
        <ul>
        {trainings.map(training => (
          <li key={training.id}
            className={'main-item ' + (
              training.id === activeTrainingId ? 'active-card' : ''
            )}
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
              <p>
                <span>date</span>
                <span>
                  {training.start_date} - {training.end_date}
                </span>
              </p>
            </div>
            {training.id === activeTrainingId && role !== "employee" && (<>
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
                          onClick={() => handleRemove(employee)}
                        >
                          <Icon icon="material-symbols-light:close" />
                        </span>
                      </div>
                    ))}
                    <div className="btns">
                      <Btn text="cancel"
                        onClick={handleCancel}
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
                  {Object.keys(trainees).map((trainee) => (
                    <li key={trainee}>
                      <span>{trainee}</span>
                      <span
                        onClick={() => {
                          handleAddDeleted(trainee);
                        }}
                      >
                        <Icon icon="material-symbols-light:close" />
                      </span>
                    </li>
                  ))}
                  </ul>
                </div>
                <div className="non-trainees">
                  {Object.keys(deletetedTrainees).length > 0 && <form className="added-trainees deleted-trainees"
                    onSubmit={(e) =>{
                      handleSubmitDeleted(e);
                    }}
                  >
                    <h1>Deleted Trainees</h1>
                    {Object.keys(deletetedTrainees).map((trainee) => (
                      <div key={trainee}>
                        <span>{trainee}</span>
                        <span
                          className='remove'
                          onClick={() => handleRemoveDeleted(trainee)}
                        >
                          <Icon icon="material-symbols-light:close" />
                        </span>
                      </div>
                    ))}
                    <div className="btns">
                      <Btn text="cancel"
                        onClick={handleCancelDeleted}
                      />
                      <button type='submit'
                        className='submit-btn'
                      >
                        save
                      </button>
                    </div>
                  </form>}
                  <h1>Non Trainees</h1>
                  <ul>
                  {nonTrainees.map(employee => (
                    <li key={employee}>
                      <span>{employee}</span>
                      <span className='add'
                        onClick={() => handleAdd(employee)}
                      >
                        add
                      </span>
                    </li>
                  ))}
                  </ul>
                </div>
              </div>
            </>)}
            {(
              training.id !== activeTrainingId
              && showEvaluation !== training.id
              && training.evaluations.length > 0
              ) && (
              <Btn text="show evaluations"
                className="show-evaluations"
                onClick={() => {
                  setShowEvaluation(training.id);
                }}
              />
            )}
            {role === "employee" && !training.is_evaluated && (
              <Btn text="evaluate"
                className="evaluate submit-btn"
                onClick={() => {
                  navigate(`/home/evaluation/${training.id}`)
                }}
              />
            )}
            {(
              showEvaluation === training.id
              && training.id !== activeTrainingId
              && training.evaluations.length > 0
              ) && (
              <div className="evaluations-list">
                <span className="close close-evaluation"
                  onClick={() => setShowEvaluation(null)}
                >
                  <Icon icon="material-symbols-light:close" />
                </span>
                {training.evaluations.map((evaluation, idx) => (
                  <div key={idx} className="evaluation">
                    <span>{evaluation.trainee}</span>
                    <span>
                      {evaluation.score} / 5
                      (
                        {evaluationString(evaluation.score)}
                        {evaluation.score < 3 ? '👎' : '👍'}
                      )
                    </span>
                    <p>{evaluation.feedback}</p>
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
        </ul>
    </section>
    </>
  );
}

const evaluationString = (score) => {
  switch(score) {
    case 1:
      return 'Poor';
    case 2:
      return 'Fair';
    case 3:
      return 'Good';
    case 4:
      return 'Very Good';
    case 5:
      return 'Excellent';
    default:
      return 'Unknown';
  }
}
