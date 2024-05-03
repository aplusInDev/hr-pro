import { React } from 'react'
import { useLoaderData, Outlet } from 'react-router-dom';
import { Header } from '../layouts';
import '../assets/css/Profile.css';

export default function Profile() {
  const data = useLoaderData();

  return (
    <>
      <Header />
      <div className='profile'>
        <aside>
          <h1>Profile</h1>
          {data && <h1>{data.email}</h1>}
        </aside>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  )
}
