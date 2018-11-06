import React from 'react';
import './styles/main.scss';

const Header = () => {
  return (
    <header>
      <div className="nav-logo">
        <ul className="nav">
          <li>Test your knowledge:</li>
          <li className="navitem arrays">Arrays</li>
          <li className="navitem strings">Strings</li>
          <li className="navitem all active">All</li>
          <li className="navitem incorrectly-answered">Your Incorrectly Answered</li>
        </ul>
        <h3 className="logo">quiz me</h3>
      </div>
    </header>
  );
}

export default Header;