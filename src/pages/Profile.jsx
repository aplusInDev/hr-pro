import { React } from 'react'
import httpClient from '../services/httpClient';
import { useLoaderData, redirect } from 'react-router-dom';
import { Header } from '../layouts';
import '../assets/css/Profile.css';
// import { Icon } from '@iconify/react';

export default function Profile() {
  const data = useLoaderData();

  return (
    <>
      <Header />
      <div className='profile'>
        <h1>Profile</h1>
        {data && <h1>{data.email}</h1>}
      </div>
    </>
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
