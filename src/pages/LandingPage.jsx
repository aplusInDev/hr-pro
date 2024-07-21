import React from 'react'
// import { Link } from 'react-router-dom'
// import { Btn, Logo } from '../components/ui';
import "../assets/css/LandingPage.css";
import { Header } from "../layouts";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <Header />
      <section>
        <h1>Welcome to the Landing Page</h1>
      </section>
    </div>
  );
}
