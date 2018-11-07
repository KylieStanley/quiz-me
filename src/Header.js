import React from 'react';
import PropTypes from 'prop-types';
import './styles/main.scss';

const Header = (props) => {
  return (
    <header>
      <div className="nav-logo">
        <ul className="nav">
          <li>Test your knowledge:</li>
          <li className="navitem Array" onClick={props.modifyQuestions}>Arrays</li>
          <li className="navitem String" onClick={props.modifyQuestions}>Strings</li>
          <li className="navitem all" onClick={props.modifyQuestions}>All</li>
          <li className="navitem incorrect" onClick={props.getFromLocalStorage}>Incorrectly Answered</li>
        </ul>
        <h3 className="logo">quiz me</h3>
      </div>
    </header>
  );
}

export default Header;


Header.propTypes = {
  modifyQuestions: PropTypes.func,
  getFromLocalStorage: PropTypes.func
}