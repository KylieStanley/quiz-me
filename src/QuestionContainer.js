import React, { Component } from 'react';
import './styles/main.scss';
import Question from './Question.js'


export default class QuestionContainer extends Component {
  render() {
    return (
      <div className="question-container">
        <Question />
      </div>
    );
  }
}