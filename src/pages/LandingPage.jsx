import React from 'react'
import { Link } from 'react-router-dom'
import { Alert, Btn, Logo } from '../components/ui';
import "../assets/css/LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <header>
        <Logo />
        <div className="btns">
          <Link to={'login'}>
            <Btn text="login" className="submit-btn" />
          </Link>
          <Link to={'register'}>
            <Btn text="register" />
          </Link>
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
