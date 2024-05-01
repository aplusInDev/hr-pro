import React from 'react'
import { Link } from 'react-router-dom'
import "../assets/css/LandingPage.css";

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
      <section>
        <h1>Welcome to the Landing Page</h1>
      </section>
    </div>
  );
}

