import React from 'react'
import { FaBuilding ,FaSignOutAlt } from "react-icons/fa";
import { BsPersonLinesFill } from "react-icons/bs";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { FaMoneyBills } from "react-icons/fa6";
import { MdOutlineWork } from "react-icons/md";
import { PiCertificateBold } from "react-icons/pi";
import '../assets/css/Sidebar.css';

function  Sidebar() {
    return (
        <aside>
         <div className="sidebar">
            <ul>
            <li><a href="#departements"><span><FaBuilding /></span>Departments</a></li>
            <li><a href="#employees"><span><BsPersonLinesFill /></span>Employees</a></li>
            <li><a href="#attendance"><span><IoCheckmarkCircleOutline /></span>Attendance</a></li>
            <li><a href="#leaves"><span><FaSignOutAlt /></span>Leaves</a></li>
            <li><a href="#salaries"><span><FaMoneyBills /></span>Salaries</a></li>
            <li><a href="#vacancies"><span><MdOutlineWork /></span>Vacancies</a></li>
            <li><a href="#training"><span><PiCertificateBold /></span>Training</a></li>
            </ul>
         </div>
        </aside>
    );
}

export default Sidebar
 