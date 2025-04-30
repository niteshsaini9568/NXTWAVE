import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, User, X, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Main.css'
import './Responsive.css'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState('ENG');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); 
    } else {
      setIsLoggedIn(false); 
    }
  }, []);

  const toggleMenu = () => {
    console.log('Menu toggled'); 
    setIsOpen(!isOpen);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ENG' ? 'FRA' : 'ENG');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login'); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <button className="menu-button" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
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
      
      <div className="navbar-links desktop-links">
        <a href="/">SHOP</a>
        <a href="#">SKILLS</a>
        <a href="#">STORIES</a>
        <a href="#">ABOUT</a>
        <a href="#">CONTACT US</a>
        {!isLoggedIn ? (
          <>
            <a href="/login">LOGIN</a>
            <a href="/signup">SIGNUP</a>
          </>
        ) : (
          <button className="logout-button" onClick={handleLogout}>
            LOGOUT
          </button>
        )}
      </div>
      
      <div className={`mobile-navbar-menu ${isOpen ? 'open' : ''}`}>
        <a href="/">SHOP</a>
        <a href="#">SKILLS</a>
        <a href="#">STORIES</a>
        <a href="#">ABOUT</a>
        <a href="#">CONTACT US</a>
        {!isLoggedIn ? (
          <>
            <a href="/login">LOGIN</a>
            <a href="/signup">SIGNUP</a>
          </>
        ) : (
          <button className="logout-button" onClick={handleLogout}>
            LOGOUT
          </button>
        )}
        <div className="mobile-language">
          <button className="mobile-language-button" onClick={toggleLanguage}>
            {language}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;