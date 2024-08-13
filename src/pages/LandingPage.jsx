import React from 'react';
import "../assets/css/LandingPage.css";
import { useNavigate } from 'react-router-dom';
import { Footer } from '../layouts';


export default function LandingPage() {
  const navigate = useNavigate();


  return (
    <>
      <div className="landing-page">
        <section className='intro'>
          <h1>
            Welcome to the HR pro app
          </h1>
          <span>Empowering HR with Digital Efficiency for a Greener, More Productive Workforce</span>
          <button onClick={() => navigate('/register')}>Get Started</button>
        </section>
        <section className="short_definition">
          <h2>How Can Our Digital Solution Streamline Your HR Operations?</h2>
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
          <div className="features_list">
            <ul>
              <h3>For the HR service</h3>
              <li>Employee Attendance Monitoring</li>
              <li>Leave Request Management</li>
              <li>Training Program Coordination</li>
              <li>Performance Evaluation</li>
              <li>Employee Database Management</li>
            </ul>
            <ul>
              <h3>For the admin</h3>
              <li>All HR manager features</li>
              <li>Employee Registration</li>
            </ul>
            <ul>
              <h3>For the Employees</h3>
              <li>Attendance Tracking</li>
              <li>Leave Request Submission</li>
              <li>Training Program Evaluation</li>
              <li>Personal Information Update</li>
            </ul>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
