import React from 'react'
import { Form, useNavigate, useActionData } from 'react-router-dom';
import "../assets/css/Register.css";

export default function UpdatePassword() {
  const actionData = useActionData();
  const navigate = useNavigate();

  if (actionData && (actionData.message || actionData.error)) {
    setTimeout(() => {
      navigate('/login');
    }, 10*1000);
  }

  return (
    <main className="update-password">
      <Form 
        method='post'
        action='/update_password'
        className='login'
      >
        {actionData?.warning && <p className='warning'>{actionData.warning}</p>}
        {actionData?.error && <p className='error'>{actionData.error}</p>}
        {actionData?.message && <p className='message'>{actionData.message}</p>}
        <label htmlFor='old_password'>Old password</label>
        <input
          placeholder='type your old password'
          aria-label='old_password'
          type='password'
          id='old_password'
          name='password'
          required
        />
        <label htmlFor='new_password'>New password</label>
        <input
          placeholder='type your new password'
          aria-label='new_password'
          type='password'
          id='new_password'
          name='new_password'
          required
        />
        <label htmlFor='confirm_password'>Confirm password</label>
        <input
          placeholder='type your confirm password'
          aria-label='confirm_password'
          type='password'
          id='confirm_password'
          name='confirm_password'
          required
        />
        <button type='submit'>Update</button>
      </Form>
    </main>
  )
}
