import React from 'react'

export default function FormPreview({form , fields}) {
  return (
    <form className='form-preview'>
      <h1>{form.name}</h1>
      <span>({form.description})</span>
      {
        fields.map((field) => {
          switch(field.type) {
            case 'select':
              return (
                <div key={field.id}>
                  <label htmlFor={field.name}>{field.name}</label>
                  <select id={field.name} name={field.name} >
                    {
                      field.options.map((option) => (
                        <option key={option.id} value={option.name}>{option.name}</option>
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
                      <label key={option.id}>
                        <input type='radio' id={option.id} name={field.name} value={option.name}
                          defaultChecked={option.name === field.default_value}
                        />
                        <span>{option.name}</span>
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
                      <label key={option.id}>
                        <input type='checkbox' id={field.name} value={option.name}
                          defaultChecked={option.name === field.default_value}
                        />
                        <span>{option.name}</span>
                      </label>
                    ))
                  }
                </div>
              )
            default:
              return (
                <div key={field.id}>
                  <label htmlFor={field.name}>{field.name}</label>
                  <input id={field.name} type={field.type} placeholder={field.description} />
                </div>
              )
          }
      })
    }
    </form>
  )
}
