import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import Splash from './Splash.js';
import Header from './Header.js';
import QuestionContainer from './QuestionContainer.js';
import AnswerBank from './AnswerBank.js';
import GameStatus from './GameStatus.js';


class App extends Component {
  constructor() {
    super()
    this.state = {
      showSplash: true,
      questions: [],
      answers: [],
      currentQuestion: {},
      correctAnswered: 0,
      incorrectAnswered: 0,
      currentIndex: 0
    }
  }

  componentDidMount = () => {
    fetch("http://memoize-datasets.herokuapp.com/api/v1/questions")
      .then(data => data.json())
      .then(data => {
        this.setState({
          questions: data.questions,
          currentQuestion: data.questions[0],
        })
      })
      .catch(err => console.log(err))

    fetch("http://memoize-datasets.herokuapp.com/api/v1/answers")
      .then(data => data.json())
      .then(data => {
        this.setState({
          answers: data.answers
        })
      })
      .catch(err => console.log(err))
  }

  setCurrent = (newQuestion, newIndex) => {
    this.setState({
      currentQuestion: newQuestion,
      currentIndex: newIndex
    })
  }

  validateAnswer = (answer,e) => {
    const remainingQuestions = this.state.questions.filter(question => question != this.state.currentQuestion);
    let index = this.state.currentIndex === remainingQuestions.length ? 0 : this.state.currentIndex;
    let correctAnswered = this.state.correctAnswered;
    let incorrectAnswered = this.state.incorrectAnswered;

    if (this.state.currentQuestion.id === answer.id) {
      e.target.disabled = true;
      e.target.classList.add('right-answer');
      correctAnswered = this.state.correctAnswered + 1;
    } else {
      incorrectAnswered = this.state.incorrectAnswered + 1;
      e.target.classList.add('right-answer');
      e.target.classList.remove('right-answer');
    }
     this.setState({
      questions: remainingQuestions,
      currentQuestion: remainingQuestions[index],
      currentIndex: index,
      correctAnswered: correctAnswered,
      incorrectAnswered: incorrectAnswered
    })
  }

  hideSplash = () => {
    this.setState({
      showSplash: false
    })
  }
  
  renderApp() {
    const { questions, answers, currentQuestion, currentIndex, correctAnswered, incorrectAnswered } = this.state;
    return (
        <div className='app-container'>
          <Header />
          <GameStatus questions={questions}
                      correctAnswered={correctAnswered}
                      incorrectAnswered={incorrectAnswered}/>
          <QuestionContainer questions={questions} 
                             currentQuestion={currentQuestion}
                             currentIndex={currentIndex}
                             setCurrent={this.setCurrent}/>
          <AnswerBank answers={answers}
                      validateAnswer={this.validateAnswer} />
        </div>
      )
  }

  render() {
    return (
      this.state.showSplash ? <Splash hideSplash={this.hideSplash} /> : this.renderApp()     
    );
  }
}

export default App;

