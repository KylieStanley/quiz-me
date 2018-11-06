import React, { Component } from 'react';
import './styles/main.scss';

const Question = (props) => {
  return (
    <h4 className="current-question">{props.currentQuestion.question}</h4>
  ); 
}

export default Question;