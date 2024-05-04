import { React } from 'react'
import { Outlet } from 'react-router-dom';
import { Header, Sidebar } from '../layouts';
import '../assets/css/Profile.css';

export default function Home() {
  

  return (
    <>
      <Header />
      <div className='profile'>
        <Sidebar />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  )
}
