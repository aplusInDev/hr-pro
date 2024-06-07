import React from 'react'
import { Link } from 'react-router-dom'
import { Alert, Logo } from '../components/ui';
import "../assets/css/LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <header>
        <Logo />
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
