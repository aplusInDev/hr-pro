import React from 'react'
import { Link } from 'react-router-dom'
import { Alert } from '../components/ui';
import "../assets/css/LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <body >
        <div className="logo">
          <span>hr</span><span>pro</span>
        </div>
       
      <Alert
        title="Welcome"
        body="Welcome to the landing page"
      /> 
   
      
        <h1 className='t1'>Empower your team with <span className='title'>HRpro</span></h1>
        <p>As your company grows, so do the opportunities available to it.<br></br>
           By partnering with us, you will benefit from many advantages 
           and<br></br> you will give your  team every means to succeed.
        </p>
        <div className="btns">
          <button type='button'><Link to={'login'}>Login In</Link></button>                                                                                                                                                               
          <button type='button'><Link to={'register'}>Sign Up</Link></button>
        </div>
    
      </body>
    </div>
  );
}
