import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, User } from 'lucide-react';
import './Main.css';
import './Responsive.css';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState('ENG');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the token exists in localStorage to determine if the user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // User is logged in
    } else {
      setIsLoggedIn(false); // User is not logged in
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ENG' ? 'FRA' : 'ENG');
  };

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    setIsLoggedIn(false); // Update the state to reflect the logged-out status
    navigate('/login'); // Redirect the user to the login page after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <button className="menu-button" onClick={toggleMenu}>
          {isOpen ? 'X' : '☰'}
        </button>
        <img src='../../Logo.png' alt="Logo" />
        <h1>LOGO</h1>
        <div>
          <div className="nav-icons">
            <button className="icon-button">
              <Search size={20} />
            </button>
            <button className="icon-button">
              <Heart size={20} />
            </button>
            <button className="icon-button">
              <ShoppingBag size={20} />
            </button>
            <div className='mobile-menu'>
              <button className="icon-button">
                <User size={20} />
              </button>
              <button className="language-button" onClick={toggleLanguage}>
                {language}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="navbar-links">
        <a href="/">SHOP</a>
        <a href="#">SKILLS</a>
        <a href="#">STORIES</a>
        <a href="#">ABOUT</a>
        <a href="#">CONTACT US</a>
        {!isLoggedIn ? (
          <>
            <a href="/login">Login</a>
            <a href="/signup">Signup</a>
          </>
        ) : (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
