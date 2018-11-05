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
      currentIndex: 0,
      incorrectQuestions: []
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
    const { questions, currentQuestion, currentIndex, correctAnswered, 
            incorrectAnswered, incorrectQuestions } = this.state;
    const choice = e.target;
    const remainingQuestions = questions.filter(question => question != currentQuestion);
    let index = currentIndex === remainingQuestions.length ? 0 : currentIndex;
    let correctCount = correctAnswered;
    let incorrectCount = incorrectAnswered;

    if (currentQuestion.id === answer.id) {
      choice.disabled = true;
      choice.classList.add('right-answer');
      correctCount = correctAnswered + 1;
    } else {
      incorrectQuestions.push(currentQuestion);
      incorrectCount = incorrectAnswered + 1;
      choice.classList.add('wrong-answer');
      setTimeout(function removeClass() {
        choice.classList.remove('wrong-answer')
      }, 1000);
    }
     this.setState({
      questions: remainingQuestions,
      currentQuestion: remainingQuestions[index],
      currentIndex: index,
      correctAnswered: correctCount,
      incorrectAnswered: incorrectCount,
      incorrectQuestions: incorrectQuestions
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
                             correctAnswered={correctAnswered}
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

