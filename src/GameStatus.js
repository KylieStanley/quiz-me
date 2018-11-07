import React from 'react';
import Timer from './Timer.js';
import './styles/main.scss';


 const GameStatus = (props) => {
  return (
    <div className="status-container">
    <ul className="statuses">
      <li>
        <p>Questions Remaining</p>
        <h2>{props.questions.length}</h2>
      </li>
      <li>
        <p>Correct</p>
        <h2>{props.correctAnswered}</h2>
      </li>
      <li>
        <p>Incorrect</p>
        <h2>{props.incorrectAnswered}</h2>
      </li>
      <li className="score">
        <p>Score</p>
        <h2>{props.correctAnswered}/{props.answers.length}</h2>
      </li>
      <li>
        <p>Timer</p>
        <Timer minutes={props.minutes}
               seconds={props.seconds} />
      </li>
    </ul>
    // </div>
  );
}

  export default GameStatus;