import { React } from 'react'
import { FOption, FDescription } from './ui'
import { NewForm } from '.'
import { putForm, deleteForm } from '../services/formService'
import { getFields } from '../services/fieldService'

export default function FormInfo({
  form, setForm,
  forms, setForms,
  setFields
}) {

  function updateFields(formId) {
    getFields(formId).then((fields) => {
      const all_fields = fields.map((f) => ({
        ...f,
        options: f.options.map((o, i) => ({ id: `option-${i}`, name: o }))
      }));
      setFields(all_fields);
    });
  }

  async function handleEdit(form) {
    const updated_form = await putForm({
      name: form.name,
      description: form.description,
      uri: form.uri
    });
    if (updated_form) {
      setForms(forms.map(f => f.id === updated_form.id ? updated_form : f));
      setForm(updated_form);
      updateFields(updated_form.id);
    }
  }

  async function handleRemove(id) {
    const isDeleted = await deleteForm(id);
    if (isDeleted) {
      setForms(forms.filter((form) => form.id !== id));
      setForm(forms[0]);
      updateFields(forms[0].id);
    }
  }

  function handleChange(form) {
    setForm(form);
    setForms(forms.map(f => f.id === form.id ? form : f));
  }
  
  function handleAdd(form) {
    setForm(form);
    setForms([...forms, form]);
    updateFields(form.id);
  }

  function handleClick(form) {
    setForm(form);
    updateFields(form.id);
  }

  const all_forms = forms.map((form, index) => {
    return (
      <li key={index} onClick={() => {handleClick(form)}}>
        <FOption option={form} onChange={handleEdit} onRemove={handleRemove}/>
      </li>
    );
  });


  return (
    <div className='form-info'>
      <form className='all-forms'>
        <label>
          <h3>form name </h3>
          <button type='button' className='form-info-btn' >
            {form.name}
          </button>
          <div className='forms-list'>
            <ul>
              {all_forms}
            </ul>
          </div>
        </label>
        <label>
          <h3>form description</h3>
            <FDescription obj={form} onChange={handleChange} />
        </label>
        <button type='submit' onClick={(e) => {
          e.preventDefault();
          handleEdit(form);
        }}>
          Update Form
        </button>
      </form>
      <NewForm onAdd={handleAdd} />
    </div>
  );
}
