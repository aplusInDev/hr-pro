import React from 'react'
import '../assets/css/Header.css'
import { Icon } from '@iconify/react';
import { Form, redirect } from 'react-router-dom';
import httpClient from '../services/httpClient';

function Header() {
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
            <li>
          <button type='button'>
            <Icon icon="mdi:domain" />
            <span>Company info</span>
          </button>
        </li>
        <li>
          <button type='button'>
            <Icon icon="marketeq:settings" />
            <span>forms settings</span>
          </button>
        </li>
        <li>
          <Form
            method='delete'
            action="/logout"
          >
            <button type='submit'>
              <Icon icon="streamline:interface-logout-arrow-exit-frame-leave-logout-rectangle-right" />
              <span>Logout</span>
            </button>
          </Form>
        </li>
            </ul>
          </li>
        </ul>
    </header>
  );
}

export default Header

export async function action() {
  try {
    await httpClient.delete('http://localhost:5000/api/v1/logout');
    // removing session_id from cookie
    document.cookie = 'session_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    console.log("logout seccessfuly")
    return redirect('/');
  } catch (err) {
    console.log('erro: ', err);
    return null;
  }
}