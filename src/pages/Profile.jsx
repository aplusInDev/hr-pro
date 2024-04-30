import { React } from 'react'
import httpClient from '../services/httpClient';
import { useLoaderData, redirect, Form } from 'react-router-dom';

export default function Profile() {
  const data = useLoaderData();

  return (
    <div>
      <h1>Profile</h1>
      {data && <h1>{data.email}</h1>}
      <Form
        method='delete'
        action="/logout"
      >
        <button type='submit'>logout</button>
      </Form>
    </div>
  )
}

export async function loader() {
  try {
    const response = await httpClient.get('http://localhost:5000/api/v1/profile');
    return response.data;
  } catch (err) {
    console.log('erro: ', err);
    if (err.response.status === 401 || err.response.status === 403) {
      return redirect('/login');
    }
    return null;
  }
}

export async function action() {
  try {
    await httpClient.delete('http://localhost:5000/api/v1/logout');
    // removing session_id from cookie
    document.cookie = 'session_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    console.log("logout seccessfuly")
    return redirect('/');
  } catch (err) {
    console.log('erro: ', err);
    return null;
  }
}
