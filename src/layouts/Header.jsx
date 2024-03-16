import React from 'react'
import '../assets/css/Header.css'

function Header() {
  return (
    <header>
        <h1>
            <span>hr</span> pro
        </h1>
        <ul>
        <li className="dark-ground"></li>
        <li className="translation"></li>
        <li className="notifications"></li>
        <li className="account"></li>
        </ul>
    </header>
  );
}

export default Header