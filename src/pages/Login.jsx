import { React } from 'react'
import httpClient from '../services/httpClient';
import { Form, redirect, useActionData, Link } from 'react-router-dom';
import "../assets/css/Register.css";
import Cookies from 'js-cookie';
// import { Header } from '../layouts';

export default function Login() {
  const errors = useActionData();

  return (
    <div className="login">
      {/* <Header /> */}
      <Form method='post' action='/login'>
        {errors?.error && <p className='error'>{errors.error}</p>}
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
        <label htmlFor='password'>Password</label>
        <input
          placeholder='type your password'
          aria-label='password'
          type='password'
          id='password'
          name='password'
          required
        />
        <Link to='/register'>
          <div className='register-link'>
            <span>Don't have an account?</span>
            <span> Register!</span>
          </div>
        </Link>
        <Link to='/reset_password'>
          <div className='reset_password-link'>
            <span>Forgot passwrod?</span>
            <span> Reset it!</span>
          </div>
        </Link>
        <button type='submit'>Login In</button>
      </Form>
    </div>
  )
}


export async function action({ request }) {
  const formData = await request.formData();

  try {
    const response = await httpClient.post('/login',
      formData,
    );
    localStorage.setItem('currentUser', JSON.stringify(response.data));
    return redirect('/home');
  } catch (err) {
    localStorage.removeItem('currentUser');
    Cookies.remove('session_id');
    return err.response.data;
  }
}
