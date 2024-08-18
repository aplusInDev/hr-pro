import { React, useState } from 'react';
import '../assets/css/Company.css';
import { Form , useLoaderData } from 'react-router-dom';
import { Btn } from '../components/ui';

export default function Company() {
  const [status, setStatus] = useState('idle'); // idle, editing, submitting
  const data = useLoaderData();
  const role = JSON.parse(localStorage.getItem('currentUser'))?.role;

  function handleEditing() {
    setStatus("editing");
  }
  
  function handleChange() {
    setStatus("changing");
  }

  function handleIdle() {
    setStatus('idle');
  }

  return (
    <main className='company'>
      <Form
        method='put'
        onSubmit={handleIdle}
      >
        <div className='error-info'>
        </div>
        <h1>Company information</h1>
        <label>
          <span>name</span>
          <input
            placeholder='type your company name'
            aria-label='company name'
            type='text'
            name='name'
            defaultValue={data?.name}
            onChange={handleChange}
            disabled={status === 'idle' || status === "submitting"}
            required
          />
        </label>
        <label>
          <span>description</span>
          <textarea
            cols={50}
            rows={3}
            placeholder='type your company description'
            aria-label='company description'
            name='description'
            defaultValue={data?.description}
            onChange={handleChange}
            disabled={status === 'idle' || status === "submitting"}
          />
        </label>
        <label>
          <span>address</span>
          <textarea
            cols={50}
            rows={3}
            placeholder='type your company address'
            aria-label='company address'
            name='address'
            defaultValue={data?.address}
            onChange={handleChange}
            disabled={status === 'idle' || status === "submitting"}
            required
          />
        </label>
        <label>
          <span>email</span>
          <input
            placeholder='type your company email'
            aria-label='email'
            type='email'
            name='email'
            defaultValue={data?.email}
            onChange={handleChange}
            disabled={status === 'idle' || status === "submitting"}
          />
        </label>
        <label>
          <span>phone</span>
          <input
            placeholder='type your company phone'
            aria-label='company phone'
            type='tel'
            name='phone'
            defaultValue={data?.phone}
            onChange={handleChange}
            disabled={status === 'idle' || status === "submitting"}
          />
        </label>
        <label>
          <span>website</span>
          <input
            placeholder='type your company website'
            aria-label='company website'
            type='url'
            name='website'
            onChange={handleChange}
            defaultValue={data?.website}
            disabled={status === 'idle' || status === "submitting"}
          />
        </label>
        {
          role === 'admin' && (status === 'idle'
          ? (
            <Btn text='edit' onClick={handleEditing} />
          )
          : (
            <div className='btns'>
            <Btn text='cancel' onClick={handleIdle} />
            <button
              type='submit'
              className='submit-btn'
              disabled={status === 'editing' || status === 'submitting'}
            >
              save
            </button>
            </div>
          ))
        }
      </Form>
    </main>
  );
}
