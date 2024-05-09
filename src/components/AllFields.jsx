import { React, useState } from 'react';
import { Btn } from './ui';
import httpClient from '../services/httpClient';

export default function AllFields({
  fields, employeeInfo,
}) {
  let initialInfo = employeeInfo.info;
  const [isEditing, setIsEditing] = useState(false);
  const [info, setInfo] = useState(initialInfo);

  function handleChange(data) {
    setInfo(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await httpClient.put(`/employees/${employeeInfo.id}/info`, info);
    setIsEditing(false);
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
                    disabled={!isEditing}
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
                  <span>{field.name}</span>
                  {
                    field.options.map((option) => (
                      <label key={option}>
                        <input type='radio'
                          id={option}
                          name={field.name}
                          disabled={!isEditing}
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
                  <span>{field.name}</span>
                  {
                    field.options.map((option) => (
                      <label key={option}>
                        <input type='checkbox'
                          id={option}
                          disabled={!isEditing}
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
                  <label htmlFor={field.name}>{field.name}</label>
                  <input
                    id={field.name}
                    type={field.type}
                    placeholder={field.description}
                    disabled={!isEditing}
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
        isEditing ? (
          <>
            <Btn
              text='cancel'
              onClick={() => {
                setInfo(initialInfo);
                setIsEditing(false);
              }}
            />
            <button type='submit' className='submit-btn'>Save</button>
          </>
        ) : (
          <Btn
            text='edit'
            onClick={() => {
              setIsEditing(true);
              initialInfo=info;
            }}
          />
        )
      }
    </div>
    </form>
  )
}
