import React, { Component } from 'react';
import Timer from './Timer.js';
import './styles/main.scss';


export default class GameStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: '00',
      minutes: '5'
    }
  }
  render() {
    return (
      <div className="status-container">
      <ul className="statuses">
        <li>
          <p>Questions Remaining</p>
          <h4>{this.props.questions.length}</h4>
        </li>
        <li>
          <p>Correct</p>
          <h4>{this.props.correctAnswered}</h4>
        </li>
        <li>
          <p>Incorrect</p>
          <h4>{this.props.incorrectAnswered}</h4>
        </li>
        <li className="score">
          <p>Score</p>
          <h4>{this.props.correctAnswered}/31</h4>
        </li>
        <li>
          <p>Timer</p>
          <Timer />
        </li>
      </ul>
      </div>
    );
  }
}