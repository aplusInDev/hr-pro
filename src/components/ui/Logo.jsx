import React from 'react'
import { Link } from 'react-router-dom';
import '../../assets/css/Logo.css';

export default function Logo({ uri = '/' }) {
  return (
    <Link to={uri}>
      <div className="logo">
        <span>hr</span>
        <span>pro</span>
      </div>
    </Link>
  );
}
