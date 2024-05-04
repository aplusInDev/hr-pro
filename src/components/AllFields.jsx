import React from 'react'

export default function AllFields({fields, data}) {
  return (
    <>
      {
        fields.map((field) => {
          switch(field.type) {
            case 'select':
              return (
                <div key={field.id}>
                  <label htmlFor={field.name}>{field.name}</label>
                  <select
                    id={field.name} name={field.name}
                    defaultValue={data[`${field.name}`] || field.default_value}
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
                        <input type='radio' id={option} name={"option"}
                          defaultChecked={option === data[`${field.name}`] || option === field.default_value}
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
                        <input type='checkbox' id={option}
                          defaultChecked={option === data[`${field.name}`] || option === field.default_value}
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
                  <input id={field.name} type={field.type} placeholder={field.description}
                    defaultValue={data[`${field.name}`]}
                  />
                </div>
              )
          }
      })
    }
    </>
  )
}
