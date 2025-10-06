import React, { useState } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className='navContainer'>
      <div className='menu-icon' onClick={toggleMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>
      <div className={`navBar ${isMobileMenuOpen ? 'active' : ''}`}>
        <Link to="/Home" onClick={closeMenu}>Home</Link>
        <Link to="/Mergesort" onClick={closeMenu}>Merge Sort</Link>
        <Link to="/InsertionSort" onClick={closeMenu}>Insertion Sort</Link>
        <Link to="/SelectionSort" onClick={closeMenu}>Selection Sort</Link>
        <Link to="/BubbleSort" onClick={closeMenu}>Bubble Sort</Link>
      </div>
    </div>
  );
};

export default Navbar;

