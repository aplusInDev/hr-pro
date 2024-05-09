import React from 'react';

export default function AllFields({
}) {
  return (
    <form className='form-preview'>
      {
        fields?.map((field) => {
          switch(field.type) {
            case 'select':
              return (
                <div key={field.id}>
                  <label htmlFor={field.name}>{field.name}</label>
                  <select
                    id={field.name}
                    disabled={disabled}
                    defaultValue={data[`${field.name}`] || field.default_value}
                    onChange={(e) => {
                      onChange({
                      ...data,
                      [field.name]: e.target.value
                      })
                      console.log("changing S ...", e.target.value);
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
                          disabled={disabled}
                          defaultChecked={option === data[`${field.name}`] || option === field.default_value}
                          onChange={(e) => {
                            onChange({
                              ...data,
                              [field.name]: e.target.checked ? option : '',
                            });
                            console.log("changing R ...", e.target.value);
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
                          disabled={disabled}
                          defaultChecked={option === data[`${field.name}`] || option === field.default_value}
                          onChange={(e) => {
                            if (e.target.checked) {
                              onChange({
                                ...data,
                                [field.name]: [...data[`${field.name}`], option]
                              });
                              console.log("changing C1 ...", e.target.value);
                            }
                            onChange({
                              ...data,
                              [field.name]: data[`${field.name}`].filter((item) => item !== option)
                            });
                            console.log("changing C2 ...", e.target.value);
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
                    disabled={disabled}
                    value={data[`${field.name}`] || field.default_value}
                    onChange={(e) => {
                      onChange({
                      ...data,
                      [field.name]: e.target.value
                    })
                    console.log("changing I ...", e.target.value);
                  }}
                  />
                </div>
              )
          }
      })
    }
    </form>
  )
}
