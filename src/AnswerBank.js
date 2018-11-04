import React, { Component } from 'react';
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

  render() {
    return (
      <div className="answer-container">
      {
        this.state.answers.map(answer => {
          return <button className="answer-btn" onClick={(e)=>this.props.validateAnswer(answer, e)}>{answer.answer}</button>
        })
      }
      </div>
    );
  }
}