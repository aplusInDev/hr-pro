import React from 'react'
import '../assets/css/Header.css'
import { Icon } from '@iconify/react';

function Header({ children }) {
  return (
    <header className='main-header'>
        <h1>
          <span>hr</span> pro
        </h1>
        <ul className='header-icons'>
          <li className="dark-ground">
            <Icon icon="akar-icons:moon" />
          </li>
          <li className="translation">
            <Icon icon="carbon:language" />
          </li>
          <li className="notifications">
            <Icon icon="mingcute:notification-line" />
          </li>
          <li className="account">
            <Icon icon="codicon:account" />
            <ul className='profile-settings'>
              {children}
            </ul>
          </li>
        </ul>
    </header>
  );
}

export default Header