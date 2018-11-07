import React from 'react';
import PropTypes from 'prop-types';
import './styles/main.scss';

const Question = (props) => {
  return (
    <h4 className="current-question">{props.currentQuestion.question}</h4>
  ); 
}

export default Question;


Question.propTypes = {
  currentQuestion: PropTypes.object,
}