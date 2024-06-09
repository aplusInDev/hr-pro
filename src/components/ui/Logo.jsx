import React from 'react'
import { Link } from 'react-router-dom';
import '../../assets/css/Logo.css';

export default function Logo() {
  return (
    <Link to={"/"}>
      <div className="logo">
        <span>hr</span>
        <span>pro</span>
      </div>
    </Link>
  );
}

  // {/* <h1>
  //   <span>hr</span> pro
  // </h1> */}