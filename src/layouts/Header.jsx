import React from 'react'
import '../assets/css/Header.css'
import { Icon } from '@iconify/react';
import { NavLink, Link } from 'react-router-dom';

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
              <NavLink to={"profile"}>
                <Icon icon="mdi:account" />
                <span>Profile</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"company"}>
                <Icon icon="mdi:domain" />
                <span>Company info</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"forms_settings"}>
                <Icon icon="marketeq:settings" />
                <span>forms settings</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/logout"}>
                <Icon icon="streamline:interface-logout-arrow-exit-frame-leave-logout-rectangle-right" />
                <span>Logout</span>
              </NavLink>
            </li>
          </ul>
        </li>
      </ul>
    </header>
  );
}

export default Header
