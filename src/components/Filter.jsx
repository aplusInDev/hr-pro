import '../assets/css/Filter.css';
import { Icon } from '@iconify/react';
import React from 'react'
import { useState } from 'react';


export default function Filter() {
  const [active, setActive] = useState(false)

  function handleActive() {
    const inputFilter = document.getElementById("filter");
    setActive(!active);
    if (active) {
      inputFilter.placeholder = 'Search ...';
    } else {
      inputFilter.placeholder = 'Filter by ...';
    }
  }

  return (
    <>
    <form className='filter'>
      <label>
        <input id='filter' type='text' placeholder='Search ...'/>
      </label>
      <button type='button'
        aria-label='filter-btn'
        onClick={handleActive}
      >
        <Icon icon='solar:filter-bold-duotone' className='filter-icon' />
      </button>
      <Menu active={active} handleActive={() => {
        setTimeout(handleActive, 500)
      }} />
      <input type='submit' value='Search'/>
    </form>
    </>
  );
}


function Menu({active, handleActive}) {
  return (
    <div
      className={`menu ${active? 'active' : ''}`}
      onMouseLeave={handleActive}
    >
    </div>
  )
}