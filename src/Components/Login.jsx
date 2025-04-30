import React, { useState } from 'react';
import axios from './axios';
import './Main.css';
import './Responsive.css';
import { useNavigate } from 'react-router-dom';


function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', formData);
      setMessage(response.data.message);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('name', response.data.name);

      if (response.data.success) {  
        navigate('/'); 
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <>
      <div className="auth-container">
        <div className="auth-header">
          <h1>LOGIN</h1>
          <p>Sign in to access your account</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit">SIGN IN</button>
        </form>

        {message && <p className="auth-message">{message}</p>}

        <div className="auth-footer">
          <p>Don't have an account? <a href="/signup">Create one</a></p>
        </div>
      </div>
    </>
  );
}

export default Login;
