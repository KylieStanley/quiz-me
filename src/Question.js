import React, { Component } from 'react';
import './styles/main.scss';


export default class Question extends Component {
  render() {
    return (
      <h4 className="current-question">{this.props.currentQuestion.question}</h4>
    ); 
  }
}