import React from 'react'
import { Link, redirect } from 'react-router-dom'
import { Alert } from '../components/ui';
import "../assets/css/LandingPage.css";
import httpClient from '../services/httpClient';

export default function LandingPage() {
  return (
    <div className="landing-page">
      <header>
        <div className="logo">
          <span>hr</span><span>pro</span>
        </div>
        <div className="btns">
          <button type='button'><Link to={'login'}>Login In</Link></button>
          <button type='button'><Link to={'register'}>Sign Up</Link></button>
        </div>
      </header>
      <Alert
        title="Welcome"
        body="Welcome to the landing page"
      />
      <section>
        <h1>Welcome to the Landing Page</h1>
      </section>
    </div>
  );
}

export async function loader() {
  try {
    await httpClient.get('http://localhost:5000/api/v1/profile');
    return redirect("/profile");
  } catch (err) {
    return null;
  }
}
