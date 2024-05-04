import { React, useState } from 'react'
import httpClient from '../services/httpClient';
import { Form, redirect } from 'react-router-dom';
import "../assets/css/Register.css";

export default function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
  }

  return (
    <div className="login">
      <header>
        <div className="logo">
          <span>hr</span><span>pro</span>
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
    const response = await httpClient.post('http://localhost:5000/api/v1/login',
      formData,
    );
    console.log(response.data);
    localStorage.setItem('currentUser', JSON.stringify(response.data));
    return redirect('/home/profile');
  } catch (err) {
    // check if the error is 403 "account not activated"
    if (err.response.status === 403) {
      return redirect('forbidden');
    }
    console.log('erro: ', err);
    return redirect('/login');
  }
}
