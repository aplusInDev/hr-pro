import { React } from 'react'
import httpClient from '../services/httpClient';
import { Form, useActionData, Link } from 'react-router-dom';
import "../assets/css/Register.css";
import { Icon } from '@iconify/react';
// import { Header } from '../layouts';

export default function ResetPassword() {
  const actionData = useActionData();

  return (
    <div className="login">
      {/* <Header /> */}
      <Form method='post' action='/reset_password'>
        {actionData?.error && <p className='error'>{actionData.error}</p>}
        {actionData?.message && <p className='message'>{actionData.message}</p>}
        <label htmlFor='company_id'>Company id</label>
        <input
          placeholder='type your company id'
          aria-label='company_id'
          type='company_id'
          id='company_id'
          name='company_id'
          required
        />
        <label htmlFor='email'>Email</label>
        <input
          placeholder='type your email'
          aria-label='email'
          type='email'
          id='email'
          name='email'
          required
        />
        <Link to='/login'>
          <div className='register-link'>
            <Icon icon="akar-icons:arrow-left" />
            <span>back</span>
          </div>
        </Link>
        <button type='submit'
          disabled={actionData?.message}
        >
          send
        </button>
      </Form>
    </div>
  )
}


export async function action({ request }) {
  const formData = await request.formData();

  try {
    const response = await httpClient.post('/reset_password',
      formData,
    );
    return response.data;
  } catch (err) {
    return err.response.data;
  }
}
