import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navContainer'>
      <div className='navBar'>
        <Link to="/Home">Home</Link>
        <Link to="/Mergesort">Merge Sort</Link>
        <Link to="/InsertionSort">Insertion Sort</Link>
        <Link to="/SelectionSort">Selection Sort</Link>
        <Link to="/BubbleSort">Bubble Sort</Link>
      </div>
    </div>
  );
};

export default Navbar;
