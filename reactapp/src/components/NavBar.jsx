import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <h2>Vegan Snacks Application</h2>
      <ul className="nav-list">
        <li><Link to="/" className="nav-link">Home</Link></li>
        <li><Link to="/getAllVeganSnacks" className="nav-link">Snacks Details</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
