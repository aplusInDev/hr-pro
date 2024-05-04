import React from 'react'

export default function AllFields({fields, data, onChange}) {
  return (
    <>
      {
        fields?.map((field) => {
          switch(field.type) {
            case 'select':
              return (
                <div key={field.id}>
                  <label htmlFor={field.name}>{field.name}</label>
                  <select
                    id={field.name}
                    defaultValue={data[`${field.name}`] || field.default_value}
                    onChange={(e) => {
                      onChange({
                      ...data,
                      [field.name]: e.target.value
                      })
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
                          defaultChecked={option === data[`${field.name}`] || option === field.default_value}
                          onChange={(e) => {
                            onChange({
                              ...data,
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
              return (
                <div key={field.id}>
                  <span>{field.name}</span>
                  {
                    field.options.map((option) => (
                      <label key={option}>
                        <input type='checkbox'
                          id={option}
                          defaultChecked={option === data[`${field.name}`] || option === field.default_value}
                          onChange={(e) => {
                            if (e.target.checked) {
                              onChange({
                                ...data,
                                [field.name]: [...data[`${field.name}`], option]
                              });
                            }
                            onChange({
                              ...data,
                              [field.name]: data[`${field.name}`].filter((item) => item !== option)
                            });
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
                    value={data[`${field.name}`] || field.default_value}
                    onChange={(e) => {
                      onChange({
                      ...data,
                      [field.name]: e.target.value
                    })
                  }}
                  />
                </div>
              )
          }
      })
    }
    </>
  )
}
