import { React, useState } from 'react'
import { FText, FType, FDescription, FIsRequired } from './ui'
import {deleteField, putField } from '../services/fieldService'
import CustomOptions from './CustomOptions';
import { Icon } from '@iconify/react';

export default function FieldsTable({ fields, setFields }) {

  function handleChange(field) {
    setFields(fields.map(f => f.id === field.id ? field : f));
  }

  return (
    <table>
        <thead>
          <tr>
            <th>field name</th>
            <th>field description</th>
            <th>field type</th>
            <th>is required</th>
            <th>default value</th>
            <th>field options</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            fields.map((field, index) => (
              <FieldRow key={index}
                field={field}
                onChange={handleChange}
                fields={fields}
                setFields={setFields}
              />
            ))
          }
        </tbody>
      </table>
  );
}

function FieldRow({
  field, onChange,
  fields, setFields
}) {
  const [isEditing, setIsEditing] = useState(false);


  function handlePutField() {
    setIsEditing(false);
    const newField = {
      name: field.name,
      description: field.discription,
      type: field.type,
      is_required: field.is_required,
      default_value: field.default_value,
      options: JSON.stringify(field.options.map(o => o.name))
    }
    putField(field.uri, newField).then((res) => {
    });
  }

  function handleDeleteField() {
    const tmp = field.id;
    deleteField(field.uri).then((res) => {
      setFields(fields.filter((f) => f.id !== tmp));
    });
  }

  return (
    <tr>
      <td>
        <FText
          fname={'name'}
          obj={field}
          onChange={onChange}
          disabled={!isEditing}
        />
      </td>
      <td>
        <FDescription
          obj={field}
          onChange={onChange}
          disabled={!isEditing}
        />
      </td>
      <td>
        <FType
          obj={field}
          onChange={onChange}
          disabled={!isEditing}
        />
      </td>
      <td>
        <FIsRequired
          obj={field}
          onChange={onChange}
          disabled={!isEditing}
        />
      </td>
      <td>
        <FText
          fname={'default_value'}
          obj={field}
          onChange={onChange}
          disabled={!isEditing}
        />
      </td>
      <td>
        <CustomOptions
          obj={field}
          onChange={onChange}
          key={"fieldsTable" + nextId++}
          disabled={!isEditing}
        />
      </td>
      <td>
        {
          isEditing ?
            <button onClick={handlePutField}>
              <Icon icon="akar-icons:check" />
            </button>
            :
            <button onClick={() => setIsEditing(true)}>
              <Icon icon="akar-icons:edit" />
            </button>
        }
        <button onClick={handleDeleteField}>
          <Icon icon="akar-icons:trash" />
        </button>
      </td>
    </tr>
  );
}

let nextId = 0;
