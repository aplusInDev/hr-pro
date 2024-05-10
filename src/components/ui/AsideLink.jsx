import React from 'react'
import '../../assets/css/AsideLink.css';
import { NavLink } from 'react-router-dom';

function AsideLink({link, icon, text}) {
  return (
    <NavLink to={link} className={`aside-link`}
    >
      <span className="icon">{icon}</span>
      <span className="text">{text}</span>
    </NavLink>
  )
}

export default AsideLink
