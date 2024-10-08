import React from 'react';
import { Icon } from '@iconify/react';
import { AsideLink } from '../components/ui';
import '../assets/css/Sidebar.css';


const employeeLinks = [
  {link: 'attendance', icon: <Icon icon="simple-line-icons:check" />, text: 'Attendance'},
  {link: 'leaves', icon: <Icon icon="fluent-mdl2:leave-user" />, text: 'Leaves'},
  {link: 'trainings', icon: <Icon icon="ph:certificate-duotone" />, text: 'Training'},
]

const hrLinks = [
  {link: 'departments', icon: <Icon icon="openmoji:department-store" />, text: 'Departments'},
  {link: 'jobs', icon: <Icon icon="hugeicons:new-job" />, text: 'Jobs'},
  {link: 'employees', icon: <Icon icon="raphael:employee" />, text: 'Employees'},
]

function  Sidebar() {
  const role = JSON.parse(localStorage.getItem('currentUser'))?.role;
  let asideLinks = [];

  if (role === 'employee') {
    asideLinks = [...employeeLinks, 
      {link: 'my_absences', icon: <Icon icon="flat-color-icons:leave" />, text: 'Absences'},
    ];
  } else {
    asideLinks = [...hrLinks, ...employeeLinks,
      {link: 'absences', icon: <Icon icon="flat-color-icons:leave" />, text: 'Absences'},
    ]
  }

  return (
    <aside>
      <nav>
        <ul>
          {asideLinks.map((field, index) => (
            <li key={index}>
              <AsideLink 
                link={field.link}
                icon={field.icon}
                text={field.text}
              />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar
