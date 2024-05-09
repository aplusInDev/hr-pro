import { React, useState } from 'react'
import httpClient from '../services/httpClient';
import { Form, redirect, Link } from 'react-router-dom';
import "../assets/css/Register.css";
import Cookies from 'js-cookie';

export default function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
  }

  return (
    <div className="login">
      <header>
        <div className="logo">
          <Link to="/">
            <span>hr</span><span>pro</span>
          </Link>
        </div>
      </header>
      <Form method='post' action='/login' onSubmit={handleSubmit}>
        <label>
          <span>Username</span>
          <input
            placeholder='type your email'
            aria-label='email'
            type='email'
            name='email'
            disabled={isSubmitting}
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
            disabled={isSubmitting}
            required
          />
        </label>
        <button type='submit' disabled={isSubmitting}>Login In</button>
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
    console.log(response.data);
    localStorage.setItem('currentUser', JSON.stringify(response.data));
    return redirect('/home/profile');
  } catch (err) {
    localStorage.clear();
    Cookies.remove('session_id');

    // return redirect('/login');
    return null;
  }
}
