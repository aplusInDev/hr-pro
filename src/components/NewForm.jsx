import { React, useState } from 'react'
import { postForm } from '../services/formService'

const company_id = localStorage.getItem('company_id');
const allFormsUrl = `http://localhost:5000/api/v1/companies/${company_id}/forms`;
const initialForm = {
  name: '',
  description: ''
}

export default function NewForm({ onAdd }) {
  const [newForm, setNewForm] = useState(initialForm);

  async function handleAdd(e) {
    e.preventDefault();
    const added_form = await postForm(allFormsUrl, newForm);
    if (added_form) {
      onAdd(added_form);
      setNewForm(initialForm);
    }
  }

  return (
    <>
      <form className='new-form'>
        <input
          name='new-form-name'
          type='text'
          placeholder='New Form Name'
          aria-label='new-form-name'
          value={newForm.name}
          onChange={(e) => setNewForm({ ...newForm, name: e.target.value })}
        />
        <textarea
          name='new-form-description'
          placeholder='New Form Description'
          aria-label='new-form-description'
          value={newForm.description}
          onChange={(e) => setNewForm({ ...newForm, description: e.target.value })}
        />
        <button type='submit'
          onClick={handleAdd}
        >
          Create Form
        </button>
      </form>
    </>
  )
}
