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

 componentDidUpdate(prevProps) {
    if (this.props.seconds !== prevProps.seconds && 
      (this.props.minutes === '7' && this.props.seconds === '10')) {
      this.setState({
        answerType: 'answer-btn'
      })
    }
  }

  render() {
    const { answerType } = this.state;
    let button;
    if ((this.props.seconds === '00' && this.props.minutes === 0) || !this.props.currentQuestion) {
      button = <button className={answerType} disabled={true} onClick={(e)=>this.handleAnswer(this.props.answer, e)}>{this.props.answer.answer}</button>
    } else if (this.props.seconds === '10' && this.props.minutes === '7') {
      button = <button className={answerType} disabled={false} onClick={(e)=>this.handleAnswer(this.props.answer, e)}>{this.props.answer.answer}</button>
    } else {
      button = <button className={answerType} onClick={(e)=>this.handleAnswer(this.props.answer, e)}>{this.props.answer.answer}</button>
    }
    return (button);
  }
}