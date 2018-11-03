import React, { Component } from 'react';
import './styles/main.scss';


export default class GameStatus extends Component {
  render() {
    return (
      <div className="status-container">
      <ul>
        <li>Questions</li>
        <li>Remaining</li>
        <li>Correct</li>
        <li>Incorrect</li>
        <li className="score">Score</li>
        <li>Timer</li>
      </ul>
      <ul>
        <li>31</li>
        <li>28</li>
        <li>3</li>
        <li>0</li>
        <li className="score">28/31</li>
        <li>5:51</li>
      </ul>
      </div>
    );
  }
}