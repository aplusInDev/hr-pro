import { React, useState } from 'react'
import { FText, FType, FDescription, FIsRequired } from './ui'
import CustomOptions from './CustomOptions';
import { postField } from '../services/fieldService';

const initialField = {
  name: '',
  description: '',
  type: '',
  is_required: false,
  default_value: '',
  options: []
};

export default function NewField({
  formId,
  fields, setFields
}) {
  const [field, setField] = useState(initialField);

async function handleSubmit(e) {
    e.preventDefault();
    const newField = {
      ...field,
      options: JSON.stringify(field.options.map(o => o.name)),
    };

    if (field.name !== '' && formId) {
      const postedField = await postField(formId, newField);
      if (postedField) {
        console.log('new field:', postedField);
        setField(initialField);
        setFields([
          ...fields,
          {
            ...postedField,
            options: postedField.options.map((o, index) => {
              return {id: "f" + index, name: o}
            })
          }
        ]);
      }
    }
  }

  return (
    <form className='new-field'
    >
      <span>
        <label>
          <h4>field name</h4>
          <FText fname={'name'} obj={field} onChange={setField} />
        </label>
        <label>
          <h4>field description</h4>
          <FDescription obj={field} onChange={setField} />
        </label>
        <label>
          <h4>field type</h4>
          <FType obj={field} onChange={setField} />
        </label>
        <label>
          <h4>is required</h4>
          <FIsRequired obj={field} onChange={setField} />
        </label>
        <label>
          <h4>default value</h4>
          <FText fname={'default_value'} obj={field} onChange={setField} />
        </label>
        <label>
          <h4>field options</h4>
          <CustomOptions obj={field} onChange={setField} key={"k"+ nextId++} />
        </label>
      </span>
      <button type='button' onClick={() => setField(initialField)}>Clear</button>
      <input type='submit' value='Add Field' onClick={handleSubmit} />
    </form>
  );
}

let nextId = 0;
