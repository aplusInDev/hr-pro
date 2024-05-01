import { React } from 'react'
import { Form, redirect, Outlet } from 'react-router-dom';
import httpClient from '../services/httpClient';
import '../assets/css/Register.css';

export default function Register() {

  return (
    <div className="register">
      <header>
        <div className="logo">
          <span>hr</span><span>pro</span>
        </div>
      </header>
      <Outlet />
      <Form
        method='post'
        action='/register'
      >
        <label>
          <span>first name</span>
          <input
            placeholder='type your first name'
            aria-label='first name'
            type='text'
            name='first_name'
            required
          />
        </label>
        <label>
          <span>last name</span>
          <input
            placeholder='type your last name'
            aria-label='last name'
            type='text'
            name='last_name'
            required
          />
        </label>
        <label>
          <span>email</span>
          <input
            placeholder='type your email'
            aria-label='email'
            type='email'
            name='email'
            required
          />
        </label>
        <label>
          <span>Password</span>
          <input
            placeholder='type your password'
            aria-label='password'
            type='password'
            name='password'
            required
          />
        </label>
        <button
          type='submit'
        >
          Sign Up
        </button>
      </Form>
    </div>
  )
}

export async function action({ request }) {
  const formData = await request.formData();

  try {
    await httpClient.post('http://localhost:5000/api/v1/accounts',
      formData,
    );
    return redirect("created");
  } catch (err) {
    console.log('error: ', err);
    return null;
  }
}
