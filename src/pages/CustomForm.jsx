import { React, useState, useEffect } from 'react'
import { FormInfo, FieldsTable, NewField , FormPreview } from '../components';
import { getForms } from '../services/formService';
import { getFields } from '../services/fieldService';
import '../assets/css/CustomForm.css'


const initialForm = {
  name: '',
  description: ''
}

export default function CustomForm() {
  const company_id = JSON.parse(localStorage.getItem('currentUser'))?.company_id;
  const allFormsUrl = `http://localhost:5000/api/v1/companies/${company_id}/forms`;
  const [forms, setForms] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [fields, setFields] = useState([]);
  const [isShowPreview, setIsShowPreview] = useState(true);

  useEffect(() => {
    const fetchForms = async () => {
      const forms = await getForms(allFormsUrl);
      if (forms) {
        setForms(forms);
        setForm(forms[0]);
        const formFields = await getFields(forms[0].id);
        const allFields = formFields.map(field => {
          return {...field, options: field.options.map((o, index) => {
            return {id: "f" + index, name: o}
          })}
        })
        setFields(allFields);
      }
    };
    fetchForms();
  }, [allFormsUrl]);

  function handleShowPreview() {
    setIsShowPreview(!isShowPreview);
  }

  return (
    <main className='custom-form'>
      <FormInfo
        form={form}
        setForm={setForm}
        forms={forms}
        setForms={setForms}
        setFields={setFields}
      />
      <NewField 
        formId={form.id}
        fields={fields}
        setFields={setFields}
      />
      <section className='show-preview'>
        <button type='button'
          className='secondary-btn'
          onClick={handleShowPreview}
        >
          show {isShowPreview? "fields" : "preview"}
        </button>
      </section>
      { isShowPreview ? (
        <FormPreview form={form} fields={fields} />
        ) : (
        <FieldsTable fields={fields} setFields={setFields} />
      )}
    </main>
  );
}
