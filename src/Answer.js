import React, { Component } from 'react';
import './styles/main.scss';


export default class Answer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answerType: 'answer-btn'
    }
  }


  handleAnswer = (answer, e) => {
    let choice = e.target;
    if (this.props.currentQuestion.id === answer.id) {
      choice.disabled = true;
      this.setState({
        answerType: 'answer-btn right-answer'
      })
    } else {
      this.setState({
        answerType: 'answer-btn wrong-answer'
      })
    }
    this.props.validateAnswer(this.props.answer, e)
  }

  render() {
    if ((this.props.seconds === '00' && this.props.minutes === 0) || !this.props.currentQuestion) {
      return (
        <button className={this.state.answerType} disabled='true' onClick={(e)=>this.handleAnswer(this.props.answer, e)}>{this.props.answer.answer}</button>
      );
    } else {
      return (
        <button className={this.state.answerType} onClick={(e)=>this.handleAnswer(this.props.answer, e)}>{this.props.answer.answer}</button>
      );
      
    }
  }
}