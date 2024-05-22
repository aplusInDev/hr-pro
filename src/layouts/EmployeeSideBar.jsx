import React from 'react';
import { Icon } from '@iconify/react';
import { AsideLink } from '../components/ui';
import '../assets/css/Sidebar.css';


const fields = [
  {link: 'attendance', icon: <Icon icon="simple-line-icons:check" />, text: 'Attendance'},
  {link: 'absences', icon: <Icon icon="flat-color-icons:leave" />, text: 'Absences'},
  {link: 'leaves', icon: <Icon icon="fluent-mdl2:leave-user" />, text: 'Leaves'},
  {link: 'training', icon: <Icon icon="ph:certificate-duotone" />, text: 'Training'},
]

export default function  EmployeeSidebar() {

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
    <aside>
      <span
        className='expand-slim'
        onClick={handleClick}
      >
        <Icon icon="mage:dots-menu" />
      </span>
      <nav>
        <ul>
          {fields.map((field, index) => (
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
