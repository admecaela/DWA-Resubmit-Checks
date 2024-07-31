import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import your CSS

//Header component displays the header of the app
const Header = () => (
  <header>
    <h1>Podcast App</h1>
    <nav>
      <Link to="/">Home</Link>
    </nav>
  </header>
);

export default Header;