import React, { useEffect, useState } from 'react';
import { Btn } from './ui';
import httpClient from '../services/httpClient';

export default function AllFields({
  fields, employee_id,
}) {
  const [info, setInfo] = useState({});
  const [status, setStatus] = useState('idle'); // idle, editing, submitting
  let initialInfo = {};

  useEffect(() => {
    async function getEmployee() {
      try {
        const response = await httpClient.get(`/employees/${employee_id}`);
        setInfo(response.data['info']);
      } catch (err) {
        console.log("erro: ", err);
      }
    }
    getEmployee();
  }, [employee_id]);


  function handleChange(data) {
    setInfo(data);
    setStatus('changing');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await httpClient.put(`/employees/${employee_id}/info`, info);
    setStatus('idle');
  }

  function handleIdle() {
    setStatus('idle');
    setInfo(initialInfo);
  }

  return (
    <form
      className='form-preview'
      onSubmit={handleSubmit}
    >
      {
        fields?.map((field) => {

          switch(field.type) {
            case 'select':
              return (
                <div key={field.id}>
                  <label htmlFor={field.name}>{field.name}</label>
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
                  <span>{field.name}</span>
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
                  <span>{field.name}</span>
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
                  <label htmlFor={field.name}>{field.name}</label>
                  <input
                    id={field.name}
                    type={field.type}
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
      {
        status !== 'idle' ? (
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
              initialInfo=info;
            }}
          />
        )
      }
    </div>
    </form>
  )
}
