import { React } from 'react'
import { Outlet } from 'react-router-dom';
import { EmployeeSideBar, Header, Sidebar } from '../layouts';
import '../assets/css/Profile.css';



export default function Home() {
  const role = JSON.parse(localStorage.getItem('currentUser'))?.role;

  return (
    <div className='profile'>
    <Header />
      {role === 'employee' ? (
        <EmployeeSideBar />
        ) : (
        <Sidebar />
      )}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
