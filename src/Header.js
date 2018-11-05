import React from 'react';
import './styles/main.scss';

const Header = () => {
  return (
    <header>
      <ul className="header">
        <li>Test your knowledge:</li>
        <li>Arrays</li>
        <li>Strings</li>
        <li>All</li>
        <li>Your Incorrectly Answered</li>
        <li className="logo">quiz me</li>
        </ul>
    </header>
  );
}

export default Header;