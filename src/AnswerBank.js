import React, { Component } from 'react';
import Answer from './Answer.js';
import './styles/main.scss';


export default class AnswerBank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: null
    }
  }

  shuffleArray = (array) => {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  componentWillMount () {
    this.setState({ answers: this.shuffleArray(this.props.answers)});
  }

  // componentDidMount() {
  //   this.answerBtn.classList.add('wrong-answer');
  // }

  render() {
    return (
      <div className="answer-wrapper">
      <div className="answer-container">
      {
        this.state.answers.map(answer => {
          // return <button className="answer-btn" onClick={(e)=>this.props.validateAnswer(answer, e)} ref={this.answerBtn}>{answer.answer}</button>
          return <Answer answer={answer} 
                         validateAnswer={this.props.validateAnswer} />
        })
      }
      </div>
      </div>
    );
  }
}