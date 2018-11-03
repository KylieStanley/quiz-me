import React, { Component } from 'react';
import './styles/main.scss';


export default class AnswerBank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: this.props.answers
    }
  }

  render() {
    return (
      <div className="answer-container">
      {
        this.props.answers.map(answer => {
          return <button className="answer-btn">{answer.answer}</button>
        })
      }
      </div>
    );
  }
}