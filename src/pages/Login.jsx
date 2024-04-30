import { React, useState } from 'react'
import httpClient from '../services/httpClient';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      const response = await httpClient.post('http://localhost:5000/api/v1/login', formDataToSend);
      console.log('Success:', response.data);
      window.location.href = "/profile";
    } catch (error) {
      console.error('Error:', error);
    }
  }


  return (
    <div className="register">
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
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}
