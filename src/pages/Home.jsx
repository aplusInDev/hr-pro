import { React } from 'react'
import { Outlet } from 'react-router-dom';
import { Header, Sidebar } from '../layouts';
import '../assets/css/Profile.css';

export default function Home() {
  

  return (
    <div className='profile'>
    <Header />
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
