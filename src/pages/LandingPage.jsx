import React from 'react'
import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className="landing-page">
      <h1>Welcome to the Landing Page</h1>
      <button type='button'><Link to={'register'}>Sign Up</Link></button>
      <button type='button'><Link to={'login'}>Login In</Link></button>
    </div>
  );
}

