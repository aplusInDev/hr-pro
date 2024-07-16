import React from 'react'
// import { Link } from 'react-router-dom'
// import { Btn, Logo } from '../components/ui';
import "../assets/css/LandingPage.css";
import { Header } from "../layouts";

export default function LandingPage() {
  return (
    <div className="landing-page">
      {/* <header>
        <Logo />
        <div className="btns">
          <Link to={'login'}>
            <Btn text="login" className="submit-btn new-btn" />
          </Link>
          <Link to={'register'}>
            <Btn text="register" />
          </Link>
        </div>
      </header> */}
      <Header />
      <section>
        <h1>Welcome to the Landing Page</h1>
      </section>
    </div>
  );
}
