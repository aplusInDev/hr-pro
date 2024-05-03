import React from 'react'
import '../assets/css/Header.css'
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className='main-header'>
      <Link to={"/"}>
        <h1>
          <span>hr</span> pro
        </h1>
      </Link>
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
            <li>
              <Link to={"company"}>
                <Icon icon="mdi:domain" />
                <span>Company info</span>
              </Link>
            </li>
            <li>
              <button type='button'>
                <Icon icon="marketeq:settings" />
                <span>forms settings</span>
              </button>
            </li>
            <li>
              <Link to={"/logout"}>
                <Icon icon="streamline:interface-logout-arrow-exit-frame-leave-logout-rectangle-right" />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </header>
  );
}

export default Header
