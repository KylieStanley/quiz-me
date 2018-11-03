import React, { Component } from 'react';
import './styles/main.scss';


export default class Header extends Component {
  render() {
    return (
      <header>
        <ul>
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
}