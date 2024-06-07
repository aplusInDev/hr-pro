import React from 'react'
import '../assets/css/Header.css'
import { Icon } from '@iconify/react';
import { NavLink } from 'react-router-dom';
import { Logo } from '../components/ui';

function Header() {
  const role = JSON.parse(localStorage.getItem('currentUser'))?.role;

  return (
    <header className='main-header'>
      <Logo />
      <ul className='header-icons'>
        <li className="dark-ground"
          onClick={() => {
            const darkLight = document.querySelector('.dark-light');
            darkLight.classList.toggle('show');
          }}
        >
          <Icon icon="akar-icons:moon" />
          <ul className="dark-light">
            <li>
              <Icon icon="akar-icons:moon" />
              <span>Dark mode</span>
            </li>
            <li>
              <Icon icon="akar-icons:sun" />
              <span>Light mode</span>
            </li>
            <li>
            <Icon icon="marketeq:settings" />
              <span>Auto</span>
            </li>
          </ul>
        </li>
        <li className="translation">
          <Icon icon="carbon:language" />
        </li>
        <li className="notifications">
          <Icon icon="mingcute:notification-line" />
        </li>
        <li className="account"
          onClick={() => {
            const profileSettings = document.querySelector('.profile-settings');
            profileSettings.classList.toggle('show');
          }}
        >
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
            {role === "admin" && (
              <li>
                <NavLink to={"forms_settings"}>
                  <Icon icon="marketeq:settings" />
                  <span>forms settings</span>
                </NavLink>
              </li>
            )}
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
