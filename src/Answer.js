import React, { Component } from 'react';
import './styles/main.scss';


export default class Answer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rightAnswer: 'right-answer'
    }
  }
  render() {
    return (
      <button className="answer-btn" onClick={(e)=>this.props.validateAnswer(this.props.answer, e)}>{this.props.answer.answer}</button>
    );
  }
}