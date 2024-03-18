import React from 'react'
import '../../assets/css/AsideLink.css';

function AsideLink({link, icon, text, active, onClick}) {
  return (
    <a 
      href={link}
      className={`aside-link ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      <span className="icon">{icon}</span>
      <span className="text">{text}</span>
    </a>
  )
}

export default AsideLink
