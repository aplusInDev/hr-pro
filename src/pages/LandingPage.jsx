import React from 'react';
import "../assets/css/LandingPage.css";

export default function LandingPage() {
  return (
    <>
      <div className="landing-page">
        <section className='intro'>
          <h1>Hi! Welcome to the HR pro app</h1>
          <p>
            Our application streamlines human resource operations by digitalizing and automating key daily tasks.
            It empowers HR professionals to efficiently monitor employee attendance, manage leave requests,
            and coordinate training programs. By reducing paper-based transactions, the software not only increases
            productivity but also promotes environmental sustainability, ultimately leading to a more organized and
            effective workforce management system.
          </p>
        </section>
        <section className='features'>
          <h2>Key Features</h2>
          <ul>
            <li>Employee Attendance Monitoring</li>
            <li>Leave Request Management</li>
            <li>Training Program Coordination</li>
            <li>Performance Evaluation</li>
            <li>Employee Database Management</li>
          </ul>
        </section>
        <section className='benefits'>
          <h2>Benefits</h2>
          <ul>
            <li>Increased Productivity</li>
            <li>Environmental Sustainability</li>
            <li>Efficient Workforce Management</li>
            <li>Enhanced Data Security</li>
            <li>Cost-Effective Solution</li>
          </ul>
        </section>
      </div>
      <footer>
        <p>&copy; 2021 HR Pro App</p>
      </footer>
    </>
  );
}
