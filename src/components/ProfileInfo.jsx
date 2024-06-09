import React, { useState } from 'react';
import { Btn } from './ui';
import httpClient from '../services/httpClient';

export default function ProfileInfo({
  fields, employee,
}) {
  let initialInfo = employee.info;
  const [info, setInfo] = useState(initialInfo);
  const [status, setStatus] = useState('idle'); // idle, editing, submitting

  function handleChange(data) {
    setInfo(data);
    setStatus('changing');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await httpClient.put(`/employees/${employee.id}/info`, info);
    setStatus('idle');
  }

  function handleIdle() {
    setStatus('idle');
    setInfo(initialInfo);
  }

  return (
  <>
    <form
      className='form-preview'
      onSubmit={handleSubmit}
    >
      {
        fields?.map((field) => {
          // field.name = field.name.replace(/ /g, '_');
          const fieldName = field.name.replace(/ /g, '_');

          switch(field.type) {
            case 'select':
              return (
                <div key={field.id}>
                  <label htmlFor={field.name}>{field.name}</label>
                  <select
                    id={field.name}
                    disabled={status === 'idle'}
                    defaultValue={info[`${fieldName}`] || field.default_value}
                    onChange={(e) => {
                      handleChange({
                      ...info,
                      [fieldName]: e.target.value
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
                  <span>{field.name}</span>
                  {
                    field.options.map((option) => (
                      <label key={option}>
                        <input type='radio'
                          id={option}
                          name={fieldName}
                          disabled={status === 'idle'}
                          defaultChecked={option === info[`${fieldName}`] || option === field.default_value}
                          onChange={(e) => {
                            handleChange({
                              ...info,
                              [fieldName]: e.target.checked ? option : '',
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
              if(!info[`${fieldName}`]) {
                handleChange({
                  ...info,
                  [fieldName]: [field.default_value]
                });
              }

              return (
                <div key={field.id}>
                  <span>{field.name}</span>
                  {
                    field.options.map((option) => (
                      <label key={option}>
                        <input type='checkbox'
                          id={option}
                          disabled={status === 'idle'}
                          defaultChecked={info[`${fieldName}`]?.includes(option)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleChange({
                                ...info,
                                [fieldName]: [...info[`${fieldName}`], option]
                              });
                            } else {
                              handleChange({
                                ...info,
                                [fieldName]: info[`${fieldName}`].filter((item) => item !== option)
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
                  <label htmlFor={field.name}>{field.name}</label>
                  <input
                    id={field.name}
                    type={field.type}
                    placeholder={field.description}
                    disabled={status === 'idle'}
                    value={info[`${fieldName}`] || field.default_value}
                    onChange={(e) => {
                      handleChange({
                      ...info,
                      [fieldName]: e.target.value
                    })
                  }}
                  />
                </div>
              )
          }
      })
    }
    <div>
      {
        status !== 'idle' ? (
          <>
            <Btn
              text='cancel'
              onClick={() => {handleIdle();}}
            />
            <button
              type='submit'
              className='submit-btn'
              disabled={status !== 'changing'}
            >
              Save
            </button>
          </>
        ) : (
          <Btn
            text='edit'
            onClick={() => {
              setStatus('editing');
              initialInfo=info;
            }}
          />
        )
      }
    </div>
    </form>
    <div className="employee_position_info">
        <div className="employee_dep">
          <span>Department: </span>
          <span>{employee.department_info.department_name}</span>
        </div>
        <div className="employee_pos">
          <span>Job: </span>
          <span>{employee.position_info.job_title}</span>
        </div>
      </div>
  </>
  )
}