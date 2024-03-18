import React from 'react'
import { useState } from 'react'
import { FaBuilding ,FaSignOutAlt } from "react-icons/fa";
import { BsPersonLinesFill } from "react-icons/bs";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { FaMoneyBills } from "react-icons/fa6";
import { MdOutlineWork } from "react-icons/md";
import { PiCertificateBold } from "react-icons/pi";
import { AsideLink } from '../components/ui';
import '../assets/css/Sidebar.css';


const fields = [
    {link: '#departments', icon: <FaBuilding />, text: 'Departments'},
    {link: '#employees', icon: <BsPersonLinesFill />, text: 'Employees'},
    {link: '#attendance', icon: <IoCheckmarkCircleOutline />, text: 'Attendance'},
    {link: '#leaves', icon: <FaSignOutAlt />, text: 'Leaves'},
    {link: '#salaries', icon: <FaMoneyBills />, text: 'Salaries'},
    {link: '#vacancies', icon: <MdOutlineWork />, text: 'Vacancies'},
    {link: '#training', icon: <PiCertificateBold />, text: 'Training'},
]


function  Sidebar() {
  const [active, setActive] = useState(0);
  
  function handleClik(index) {
      setActive(index);
  }

  return (
    <aside>
      <nav>
        <ul>
          {fields.map((field, index) => (
            <li key={index}>
              <AsideLink 
                link={field.link}
                icon={field.icon}
                text={field.text}
                active={active === index}
                onClick={() => handleClik(index)}
              />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar
