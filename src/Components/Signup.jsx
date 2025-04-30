import React, { useState } from 'react';
import axios from './axios';
import './Main.css';
import './Responsive.css';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState('');

  const navigate = useNavigate(); // Corrected location of useNavigate

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setMessage('Passwords do not match');
    }

    try {
      const response = await axios.post('/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      setMessage(response.data.message);
      localStorage.setItem('token', response.data.token);

      if (response.data.success) {  
        navigate('/'); 
      }
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <>
      <div className="auth-container">
        <div className="auth-header">
          <h1>CREATE ACCOUNT</h1>
          <p>Create an account to see pricing</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
          <button type="submit">CREATE ACCOUNT</button>
        </form>

        {message && <p className="auth-message">{message}</p>}

        <div className="auth-footer">
          <p>Already have an account? <a href="/login">Sign in</a></p>
        </div>
      </div>
    </>
  );
}

export default Signup;
