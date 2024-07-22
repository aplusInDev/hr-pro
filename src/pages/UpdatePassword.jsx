import { React } from 'react'
import httpClient from '../services/httpClient';
import { Form, useNavigate, useActionData } from 'react-router-dom';
import "../assets/css/Register.css";
import Cookies from 'js-cookie';

export default function UpdatePassword() {
  const actionData = useActionData();
  const navigate = useNavigate();

  if (actionData && (actionData.message || actionData.error)) {
    setTimeout(() => {
      navigate('/login');
    }, 10*1000);
  }

  return (
    <div className="login-page">
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
    </div>
  )
}


export async function action({ request }) {
  const formData = await request.formData();
  const password = formData.get('password');
  const new_password = formData.get('new_password');
  const confirm_password = formData.get('confirm_password');


  if (new_password !== confirm_password) {
    return { warning: 'New password and confirm password do not match' };
  }

  if (new_password === password) {
    return { warning: 'New password must be different from the old password' };
  }

  try {
    const response = await httpClient.post('/update_password',
      formData,
    );
    return response.data;
  } catch (err) {
    return err.response.data;
  } finally {
    Cookies.remove('session_id');
    localStorage.removeItem('currentUser');
  }
}
