import React, { Component } from 'react';
import Timer from './Timer.js';
import './styles/main.scss';


export default class GameStatus extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="status-container">
      <ul className="statuses">
        <li>
          <p>Questions Remaining</p>
          <h2>{this.props.questions.length}</h2>
        </li>
        <li>
          <p>Correct</p>
          <h2>{this.props.correctAnswered}</h2>
        </li>
        <li>
          <p>Incorrect</p>
          <h2>{this.props.incorrectAnswered}</h2>
        </li>
        <li className="score">
          <p>Score</p>
          <h2>{this.props.correctAnswered}/{this.props.answers.length}</h2>
        </li>
        <li>
          <p>Timer</p>
          <Timer questions={this.props.questions}
                 minutes={this.props.minutes}
                 seconds={this.props.seconds} 
                 tick={this.props.tick} />
        </li>
      </ul>
      </div>
    );
  }
}