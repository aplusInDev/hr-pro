import { React, useEffect, useState } from 'react'
import { Form, useActionData, Link, useNavigate } from 'react-router-dom';
import '../assets/css/Register.css';
import { Header } from '../layouts';

export default function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const actionData = useActionData();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setIsSubmitting(true);
  }

  useEffect(() => {
    if (isSubmitting && actionData?.error) {
      setIsSubmitting(false);
      setError(actionData.error);
      setTimeout(() => {
        setError(null);
      }, 5*1000);
    }
    if (actionData?.message) {
      setMessage(actionData.message);
      setTimeout(() => {
        navigate("/login");
      }, 5*1000);
    }
  }, [actionData, isSubmitting, navigate]);

  const handleNext = () => {
    const form = document.querySelector('form');
    const sections = form.querySelectorAll('section');
    const allInputs = Array.from(sections[0].querySelectorAll('input'));
    const allValid = allInputs.every(input => input.reportValidity());

    if (allValid) {
      sections[0].style.display = 'none';
      sections[1].style.display = 'block';
    }
  }

  const handleBack = () => {
    const form = document.querySelector('form');
    const sections = form.querySelectorAll('section');
    sections.forEach((section, index) => {
      if (index === 0) {
        section.style.display = 'block';
      } else {
        section.style.display = 'none';
      }
    });
  }

  return (
    <div className="register-page">
      <Header showBtns={false} />
      <section className='intro'>
        <h1>
          Welcome to the HR pro app
        </h1>
        <span>Empowering HR with Digital Efficiency for a Greener, More Productive Workforce</span>
      </section>
      <Form
        method='post'
        action='/register'
        onSubmit={handleSubmit}
        className='register'
        >
        {error && <p className='error'>{error}</p>}
        {message && <p className='message'>{message}</p>}
        <section className='admin-info'>
          <h2>Your Personal Information</h2>
          <label>
            <span>first name</span>
            <input
              placeholder='type your first name'
              aria-label='first name'
              type='text'
              name='first_name'
              disabled={isSubmitting}
              required
            />
          </label>
          <label>
            <span>last name</span>
            <input
              placeholder='type your last name'
              aria-label='last name'
              type='text'
              name='last_name'
              disabled={isSubmitting}
              required
            />
          </label>
          <label>
            <span>email</span>
            <input
              placeholder='type your email'
              aria-label='email'
              type='email'
              name='email'
              required
            />
          </label>
          <label>
            <span>Password</span>
            <input
              placeholder='type your password'
              aria-label='password'
              type='password'
              name='password'
              required
            />
          </label>
          <Link to='/login'>
            <div className='login-link'>
                <span>Already have an account?</span>
                <span> Login!</span>
            </div>
          </Link>
          <button
            type='button'
            onClick={handleNext}
          >
            next
          </button>
        </section>
        <section className='company-info'>
          <h2>Your Company Information</h2>
          <label>
            <span>company name</span>
            <input
              placeholder='type your company name'
              aria-label='company name'
              type='text'
              name='company_name'
              disabled={isSubmitting}
              required
            />
          </label>
          <label>
            <span>company description</span>
            <textarea
              cols={50}
              rows={3}
              placeholder='type your company description'
              aria-label='company description'
              name='company_description'
              disabled={isSubmitting}
            />
          </label>
          <label>
            <span>company address</span>
            <textarea
              cols={50}
              rows={3}
              placeholder='type your company address'
              aria-label='company address'
              name='company_address'
              disabled={isSubmitting}
              required
            />
          </label>
          <label>
            <span>company email</span>
            <input
              placeholder='type your company email'
              aria-label='email'
              type='email'
              name='company_email'
              disabled={isSubmitting}
            />
          </label>
          <label>
            <span>company phone</span>
            <input
              placeholder='type your company phone'
              aria-label='company phone'
              type='tel'
              name='company_phone'
              disabled={isSubmitting}
            />
          </label>
          <label>
            <span>company website</span>
            <input
              placeholder='type your company website'
              aria-label='company website'
              type='url'
              name='company_website'
              disabled={isSubmitting}
            />
          </label>
          <button 
            type='button'
            id='back'
            disabled={isSubmitting}
            onClick={handleBack}
          >
            back
          </button>
          <button
            type='submit'
            disabled={isSubmitting}
          >
            Sign Up
          </button>
        </section>
      </Form>
    </div>
  )
}
