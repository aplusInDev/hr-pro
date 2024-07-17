import { React } from 'react'
import httpClient from '../services/httpClient';
import { Form, redirect } from 'react-router-dom';
import "../assets/css/Register.css";
import Cookies from 'js-cookie';
import { Logo } from '../components/ui';

export default function Login() {

  return (
    <div className="login">
      <header>
        <Logo />
      </header>
      <Form method='post' action='/login'>
        <label>
          <span>Username</span>
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
        <button type='submit'
        >
          Login In
        </button>
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
    console.log(err);
    return err.response.data.error;
  }
}
