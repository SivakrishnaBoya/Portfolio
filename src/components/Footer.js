import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {currentYear} Siva Krishna Boya. All rights reserved.</p>
        <p>Built with React.js</p>
      </div>
    </footer>
  );
};

export default Footer;
