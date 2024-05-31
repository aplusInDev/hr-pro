import React, { useState, useEffect } from 'react';
import { Btn } from './ui';
import httpClient from '../services/httpClient';

export default function Info({
  fields, obj_id,
  path, class_name='',
}) {
  const [info, setInfo] = useState({});
  const [status, setStatus] = useState('idle'); // idle, editing, submitting

  useEffect(() => {
    async function getInfo() {
      try {
        const response = await httpClient.get(`/${path}/${obj_id}`);
        setInfo(response.data['info']);
      } catch (err) {
        console.log("erro: ", err);
      }
    }
    getInfo();
  }, [obj_id, path]);

  function handleChange(data) {
    setInfo(data);
    setStatus('changing');
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
    <form
      className={class_name}
      onSubmit={handleSubmit}
      onClick={(e) => e.stopPropagation()}
    >
      {
        fields?.map((field) => {
          field.name = field.name.replace(/ /g, '_');

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
            }}
          />
        )
      }
    </div>
    </form>
  )
}
