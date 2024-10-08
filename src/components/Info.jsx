import React, { useState, useEffect } from 'react';
import { Btn } from './ui';
import httpClient from '../services/httpClient';
import { Icon } from '@iconify/react/dist/iconify.js';

export default function Info({
  fields, obj_id,
  path, class_name='',
}) {
  const [info, setInfo] = useState({});
  const [status, setStatus] = useState('idle'); // idle, editing, submitting
  const [departmentsNames, setDepartmentsNames] = useState([]);
  const [jobsTitles, setJobsTitles] = useState([]);
  const [depEditStatus, setDepEditStatus] = useState("idle"); // idle, editing, submitting
  const [jobEditStatus, setJobEditStatus] = useState("idle"); // idle, editing, submitting
  const [dep, setDep] = useState("");
  const [job, setJob] = useState("");
  const [tmpDep, setTmpDep] = useState(null);
  const [tmpJob, setTmpJob] = useState(null);

  useEffect(() => {
    async function getInfo() {
      try {
        const response = await httpClient.get(`/${path}/${obj_id}`);
        setInfo(response.data['info']);
        if (path === 'employees') {
          setJob(response.data.position_info.job_title);
          setDep(response.data.department_info.department_name);
          getEmployeePosition(response.data.company_id);
        }
      } catch (err) {
        console.log("erro: ", err);
      }
    }
    async function getEmployeePosition(company_id) {
      const depNames = await httpClient.get(`/companies/${company_id}/departments_names`);
      const jbsTitles = await httpClient.get(`/companies/${company_id}/jobs_titles`);
      setDepartmentsNames(depNames.data);
      setJobsTitles(jbsTitles.data);
    }
    getInfo();
  }, [obj_id, path]);

  function handleChange(data) {
    setInfo(data);
    setStatus('changing');
  }

  function handleJobChange(e) {
    setTmpJob(job);
    setJob(e.target.value);
    setJobEditStatus("changing");
  }
    
  function handleDepChange(e) {
    setTmpDep(dep);
    setDep(e.target.value);
    setDepEditStatus("changing");
  }

  async function handleDepSubmit(e) {
    e.preventDefault();
    setDepEditStatus("submitting");
    try {
      const response = await httpClient.put(`/employees/${obj_id}`, {department_name: dep});
      setDep(response.data.department_info.department_name);
      setTmpDep(null);
    } catch(err) {
      console.log("erro: ", err);
      setDep(tmpDep);
    } finally {
      setDepEditStatus("idle")
    }
  }

  async function handleJobSubmit(e) {
    e.preventDefault();
    setJobEditStatus("submitting");
    try {
      const response = await httpClient.put(`/employees/${obj_id}`, {job_title: job});
      setJob(response.data.position_info.job_title);
      setTmpJob(null);
    } catch(err) {
      console.log("erro: ", err);
      setJob(tmpJob);
    } finally {
      setJobEditStatus("idle")
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (path === 'employees') {
      await httpClient.put(`/${path}/${obj_id}/info`, info);
    } else {
      await httpClient.put(`/${path}/${obj_id}`, info);
    }
    setStatus('idle');
  }

  function handleIdle() {
    setStatus('idle');
  }

  class_name = class_name !== '' ? "form-preview" : "form-preview " + class_name

  return (
  <>
    <form
      className={class_name}
      onSubmit={handleSubmit}
      onClick={(e) => e.stopPropagation()}
    >
      {
        fields?.map((field) => {
          field.name = field.name.replace(/ /g, '_');
          const fieldName = field.name.replace(/_/g, ' ');

          switch(field.type) {
            case 'select':
              return (
                <div key={field.id}>
                  <label htmlFor={field.name}>{fieldName}</label>
                  <select
                    id={field.name}
                    disabled={status === 'idle'}
                    defaultValue={info[`${field.name}`] || field.default_value}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleChange({
                      ...info,
                      [field.name]: e.target.value
                      });
                    }}
                  >
                    {
                      field.options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))
                    }
                  </select>
                </div>
              )
            case 'radio':
              return (
                <div key={field.id}>
                  <span>{fieldName}</span>
                  {
                    field.options.map((option) => (
                      <label key={option}>
                        <input type='radio'
                          id={option}
                          name={field.name}
                          disabled={status === 'idle'}
                          defaultChecked={option === info[`${field.name}`] || option === field.default_value}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleChange({
                              ...info,
                              [field.name]: e.target.checked ? option : '',
                            });
                          }}
                        />
                        <span>{option}</span>
                      </label>
                    ))
                  }
                </div>
              )
            case 'checkbox':
              if(!info[`${field.name}`]) {
                handleChange({
                  ...info,
                  [field.name]: [field.default_value]
                });
              }

              return (
                <div key={field.id}>
                  <span>{fieldName}</span>
                  {
                    field.options.map((option) => (
                      <label key={option}>
                        <input type='checkbox'
                          id={option}
                          disabled={status === 'idle'}
                          defaultChecked={info[`${field.name}`]?.includes(option)}
                          onChange={(e) => {
                            e.stopPropagation();
                            if (e.target.checked) {
                              handleChange({
                                ...info,
                                [field.name]: [...info[`${field.name}`], option]
                              });
                            } else {
                              handleChange({
                                ...info,
                                [field.name]: info[`${field.name}`].filter((item) => item !== option)
                              });
                            }
                          }}
                        />
                        <span>{option}</span>
                      </label>
                    ))
                  }
                </div>
              )
            default:
              return (
                <div key={field.id}>
                  <label htmlFor={field.name}>{fieldName}</label>
                  <input
                    id={field.name}
                    type={field.type}
                    autoComplete='off'
                    placeholder={field.description}
                    disabled={status === 'idle'}
                    value={info[`${field.name}`] || field.default_value}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleChange({
                      ...info,
                      [field.name]: e.target.value
                    })
                  }}
                  />
                </div>
              )
          }
        })
      }
      <div>
        {status !== 'idle' ? (
          <>
            <Btn
              text='cancel'
              onClick={(e) => {
                e.stopPropagation();
                handleIdle();
              }}
            />
            <button
              type='submit'
              className='submit-btn'
              disabled={status !== 'changing'}
              onClick={(e) => e.stopPropagation()}
            >
              Save
            </button>
          </>
          ) : (
            <Btn
              text='edit'
              onClick={(e) => {
                e.stopPropagation();
                setStatus('editing');
              }}
            />
          )
        }
      </div>
    </form>
    {path === "employees" && (
      <div className="employee_position_info">
        <div className="employee_dep">
          <label htmlFor="dep_name"><span>Department</span></label>
          <select
            id="dep_name"
            disabled={depEditStatus === 'idle'}
            value={dep}
            onChange={handleDepChange}
          >
            {departmentsNames.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {depEditStatus === "idle" && (
            <Btn text=""
              onClick={() => setDepEditStatus("editing")}
            >
              <Icon icon="akar-icons:edit" />
            </Btn>
          )}
          {depEditStatus === "changing" && (
            <Btn text=""
              onClick={handleDepSubmit}
            >
              <Icon icon="akar-icons:check" />
            </Btn>
          )}
        </div>
        <div className="employee_pos">
          <label htmlFor="job_title"><span>Position</span></label>
          <select
            id="job_title"
            disabled={jobEditStatus === 'idle'}
            value={job}
            onChange={handleJobChange}
          >
            {jobsTitles.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {jobEditStatus === "idle" && (
            <Btn text=""
              onClick={() => setJobEditStatus("editing")}
            >
              <Icon icon="akar-icons:edit" />
            </Btn>
          )}
          {jobEditStatus === "changing" && (
            <Btn text=""
              onClick={handleJobSubmit}
            >
              <Icon icon="akar-icons:check" />
            </Btn>
          )}
        </div>
      </div>
    )}
  </>
  )
}
