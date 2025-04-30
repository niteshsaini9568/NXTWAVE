import { useState } from 'react';
import { Instagram, Linkedin } from 'lucide-react';
import './Main.css'
import './Responsive.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Subscribed with email:', email);
    setEmail('');
  };

  const toggleDropdown = (index) => {
    if (activeDropdown === index) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(index);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-col">
            <h3 className="footer-heading">BE THE FIRST TO KNOW</h3>
            <p className="footer-text">Lorem ipsum is simply dummy text of the printing and typesetting industry, this is simply dummy text.</p>
            <div className="newsletter-form">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your e-mail..."
                className="newsletter-input"
              />
              <button
                onClick={handleSubmit}
                className="subscribe-button"
              >
                SUBSCRIBE
              </button>
            </div>
          </div>

          <div className="footer-col empty-col"></div>

          <div className="footer-col">
            <h3 className="footer-heading">CALL US</h3>
            <p className="contact-info">+44 221 133 5360</p>
            <p className="contact-info email">customercare@mettamuse.com</p>
            
            <h3 className="footer-heading">CURRENCY</h3>
            <div className="currency-selector">
              <img src="../../USA.png" alt="US Flag" className="flag-icon" /> • USD
            </div>
            <p className="currency-note">Transactions will be completed in Euros and a currency reference is available on hover.</p>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom">
          <div className={`footer-col ${activeDropdown === 0 ? 'active' : ''}`}>
            <h3 className="footer-logo" onClick={() => toggleDropdown(0)}>mettā muse</h3>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Stories</a></li>
              <li><a href="#">Artisans</a></li>
              <li><a href="#">Boutiques</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">EU Compliances Docs</a></li>
            </ul>
          </div>

          <div className={`footer-col ${activeDropdown === 1 ? 'active' : ''}`}>
            <h3 className="footer-heading" onClick={() => toggleDropdown(1)}>QUICK LINKS</h3>
            <ul className="footer-links">
              <li><a href="#">Orders & Shipping</a></li>
              <li><a href="#">Join/Login as a Seller</a></li>
              <li><a href="#">Payment & Pricing</a></li>
              <li><a href="#">Return & Refunds</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <div className={`footer-col ${activeDropdown === 2 ? 'active' : ''}`}>
              <h3 className="footer-heading" onClick={() => toggleDropdown(2)}>FOLLOW US</h3>
              <ul className="footer-links">
                <div className="social-icons">
                  <a href="#" className="social-icon">
                    <Instagram size={16} />
                  </a>
                  <a href="#" className="social-icon">
                    <Linkedin size={16} />
                  </a>
                </div>
              </ul>
            </div>
            
          <div>
            <h3 className="footer-heading payment-heading">mettā muse ACCEPTS</h3>
            <div className="payment-icons">
              <img src="../../G-pay.png" alt="Google Pay" className="payment-icon" />
              <img src="../../Mastercard.png" alt="Mastercard" className="payment-icon" />
              <img src="../../Paypal.png" alt="PayPal" className="payment-icon" />
              <img src="../../American.jpeg" alt="American Express" className="payment-icon" />
              <img src="../../Apple.jpeg" alt="Apple Pay" className="payment-icon" />
              <img src="../../Shop.jpeg" alt="Shop Pay" className="payment-icon" />
            </div>
          </div>
 
          </div>
      </div>
        <div className="copyright">
          Copyright © 2023 mettamuse. All rights reserved.
        </div>
      </div>
    </footer>
  );
}