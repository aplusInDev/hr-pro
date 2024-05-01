import { React } from 'react'
import httpClient from '../services/httpClient';
import { Form, redirect, Outlet } from 'react-router-dom';
import "../assets/css/Register.css";

export default function Login() {
  return (
    <div className="login">
      <header>
        <div className="logo">
          <span>hr</span><span>pro</span>
        </div>
      </header>
      <Outlet />
      <Form method='post' action='/login'>
        <label>
          <span>Username</span>
          <input
            placeholder='type your email'
            aria-label='email'
            type='email'
            name='email'
          />
        </label>
        <label>
          <span>Password</span>
          <input
            placeholder='type your password'
            aria-label='password'
            type='password'
            name='password'
          />
        </label>
        <button type='submit'>Login In</button>
      </Form>
    </div>
  )
}

export async function action({ request }) {
  const formData = await request.formData();

  try {
    await httpClient.post('http://localhost:5000/api/v1/login',
      formData,
    );
    return redirect('/profile');
  } catch (err) {
    // check if the error is 403 "account not activated"
    if (err.response.status === 403) {
      return redirect('forbidden');
    }
    console.log('erro: ', err);
    return redirect('/login');
  }
}
