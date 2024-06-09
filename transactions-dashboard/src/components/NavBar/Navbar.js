import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'

const Navbar = () => {
  return (
    <nav className='nav'>
      <Link  to="/" className='link'><h1 className='logo'>Transaction<span>Analytics</span></h1></Link>
      <ul className="navLinks">
        <li><Link to="/" className='link'>Transaction Table</Link></li>
        <li><Link to="/statistics" className='link' >Statistics</Link></li>
        <li><Link to="/bar-chart" className='link' >Bar Chart</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
