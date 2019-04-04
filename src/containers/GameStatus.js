import React from 'react';
import Timer from '../Timer.js';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/main.scss';

const GameStatus = props => {
  return (
    <div className="status-container">
      <ul className="statuses">
        <li>
          <p>Remaining</p>
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
          <h2>
            {props.correctAnswered}/{props.answers.length}
          </h2>
        </li>
        <li>
          <p>Timer</p>
          <Timer minutes={props.minutes} seconds={props.seconds} />
        </li>
      </ul>
    </div>
  );
};

export const mapStateToProps = state => ({
  questions: state.questions,
  answers: state.answers
});

export default connect(mapStateToProps)(GameStatus);

GameStatus.propTypes = {
  minutes: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  seconds: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  questions: PropTypes.arrayOf(PropTypes.object),
  answers: PropTypes.arrayOf(PropTypes.object),
  correctAnswered: PropTypes.number,
  incorrectAnswered: PropTypes.number
};
