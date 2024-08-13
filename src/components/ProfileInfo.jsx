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
          field.name = field.name.replace(/ /g, '_');
          const fieldName = field.name.replace(/_/g, ' ');

          switch(field.type) {
            case 'select':
              return (
                <div key={field.id}>
                  <label htmlFor={field.name}>{fieldName}</label>
                  <select
                    id={field.name}
                    name={field.name}
                    disabled={status === 'idle'}
                    defaultValue={info[`${field.name}`] || field.default_value}
                    onChange={(e) => {
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
                      <label key={option} htmlFor={option}>
                        <input type='radio'
                          id={option}
                          name={field.name}
                          disabled={status === 'idle'}
                          defaultChecked={option === info[`${field.name}`] || option === field.default_value}
                          onChange={(e) => {
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
                    field.options.map((option, index) => (
                      <label key={option}>
                        <input type='checkbox'
                          id={option}
                          name={field.name + index}
                          disabled={status === 'idle'}
                          defaultChecked={info[`${field.name}`]?.includes(option)}
                          onChange={(e) => {
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
                    name={field.name}
                    autoComplete='off'
                    type={field.type}
                    placeholder={field.description}
                    disabled={status === 'idle'}
                    value={info[`${field.name}`] || field.default_value}
                    onChange={(e) => {
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