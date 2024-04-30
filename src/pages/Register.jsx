import { React, useState } from 'react'

export default function Register() {
  const [status, setStatus] = useState('idle'); // ['idle', 'loading', 'success', 'error']
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      console.log('Passwords do not match');
      return;
    }
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      const response = await fetch('http://localhost:5000/api/v1/accounts', {
        method: 'POST',
        body: formDataToSend
      });
      const data = await response.json();
      console.log('Success:', data);
      setStatus('success');
      setTimeout(() => {
        window.location.href = "/";
      }, 200);
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
    }
  }


  return (
    <div className="register">
      {status === 'success' && (
        <>
          <h1>Account created successfully</h1>
          <h2>Visit your email and activate your account</h2>
        </>
      )}
      {status === 'error' && <h1>There was an error creating the account</h1>}
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <input
          type='password'
          placeholder='Password'
          value={formData.confirmPassword}
          name='confirmPassword'
          onChange={handleInputChange}
          required
        />
        <button type='submit'>Register</button>
      </form>
    </div>
  );
}
