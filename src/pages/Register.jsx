import { React, useState } from 'react'
import { Form, redirect } from 'react-router-dom';
import httpClient from '../services/httpClient';
import '../assets/css/Register.css';

export default function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
  }

  const handleNext = () => {
    const form = document.querySelector('form');
    const sections = form.querySelectorAll('section');
    sections.forEach((section, index) => {
      if (index === 0) {
        section.style.display = 'none';
      } else {
        section.style.display = 'block';
      }
    });
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
    <div className="register">
      <header>
        <div className="logo">
          <span>hr</span><span>pro</span>
        </div>
      </header>
      <Form
        method='post'
        action='/register'
        onSubmit={handleSubmit}
        >
        <section className='admin-info'>
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
          <button
            type='button'
            onClick={handleNext}
          >
            next
          </button>
        </section>
        <section className='company-info'>
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

export async function action({ request }) {
  const formData = await request.formData();

  try {
    await httpClient.post('http://localhost:5000/api/v1/accounts',
      formData,
    );
    return redirect("/login");
  } catch (err) {
    console.log('error: ', err);
    return null;
  }
}
