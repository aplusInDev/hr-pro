import React, { useState, useEffect } from 'react'
import '../assets/css/Header.css'
import { Icon } from '@iconify/react';
import { NavLink, Link } from 'react-router-dom';
import { Logo, Btn } from '../components/ui';

function Header({ isConnected, showBtns=true }) {
  const initialMode = localStorage.getItem('theme') || 'auto';
  const role = JSON.parse(localStorage.getItem('currentUser'))?.role;
  const [mode, setMode] = useState(initialMode); // auto, dark, light


  useEffect(() => {
    handleChangeMode(mode);
  }, [mode]);

  function handleClick() {
    const texts = Array.from(document.querySelectorAll('.text'));
    const sideBar = document.querySelector('aside');
    const main = document.querySelector('main');

    texts.forEach(text => {
      text.classList.toggle('hide');

    });
    sideBar.classList.toggle('slim');
    main.classList.toggle('wide');
  }

  return (
    <header className='main-header'>
      <div className='logo-container'>
        {isConnected && (
          <span
            className='expand-slim'
            onClick={handleClick}
          >
            <Icon icon="mage:dots-menu" />
          </span>
        )}
        <Logo uri={isConnected? '/home': '/'} />
      </div>
      <ul className={isConnected? 'header-icons' : 'guest-icons'}>
        <li className={`dark-ground ${mode==='dark'? 'active': ''}`}
          onClick={() => {
            const darkLight = document.querySelector('.dark-light');
            darkLight.classList.toggle('show');
          }}
        >
          <Icon icon="akar-icons:moon" />
          <ul className="dark-light">
            <li className={mode==='dark'? 'active': ''}
              onClick={() => {setMode("dark")}}
            >
              <Icon icon="akar-icons:moon" />
              <span>Dark mode</span>
            </li>
            <li className={mode==='light'? 'active': ''}
              onClick={() => {setMode("light")}}
            >
              <Icon icon="akar-icons:sun" />
              <span>Light mode</span>
            </li>
            <li className={mode==='auto'? 'active': ''}
              onClick={() => {setMode("auto")}}
            >
            <Icon icon="marketeq:settings" />
              <span>Auto</span>
            </li>
          </ul>
        </li>
        <li className="translation">
          <Icon icon="carbon:language" />
        </li>
        {isConnected && (<>
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
                <NavLink to={"/update_password"}>
                  <Icon icon="carbon:password" />
                  <span>Update password</span>
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
        </>)}
      </ul>
      {isConnected || ( showBtns && 
        <>
          <div className="btns">
            <Link to={'login'}>
              <Btn text="login" className="submit-btn new-btn" />
            </Link>
            <Link to={'register'}>
              <Btn text="register" />
            </Link>
          </div>
        </>
      )}
    </header>
  );
}

export default Header

function handleChangeMode(theme) {
  if (theme === 'dark') {
    localStorage.setItem('theme', 'dark');
    enableDarkMode();
    } else if (theme === 'light') {
    localStorage.setItem('theme', 'light');
    disableDarkMode()
    } else {
    localStorage.setItem('theme', 'auto');
    handleAutoTheme();
  }
}

window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', () => {
    const theme = localStorage.getItem('theme');

    if (theme === 'auto') {
      handleAutoTheme();
    }
  });

function handleAutoTheme() {
  const darkGround = document.querySelector('.dark-ground');
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    enableDarkMode();
    darkGround.classList.add('active');
    } else {
      disableDarkMode();
      darkGround.classList.remove('active');
  }
}

function enableDarkMode() {
  const profile = document.querySelector('#root');
  const darkGround = document.querySelector('.dark-ground');
  darkGround.classList.add('active');
  profile.classList.add('dark-mode');
}
  
function disableDarkMode() {
  const profile = document.querySelector('#root');
  const darkGround = document.querySelector('.dark-ground');
  profile.classList.remove('dark-mode');
  darkGround.classList.remove('active');
}
