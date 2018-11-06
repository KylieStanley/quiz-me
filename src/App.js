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
      incorrectQuestions: [],
      minutes: '7',
      seconds: '10'
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
    const remainingQuestions = questions.filter(question => question != currentQuestion);
    let index = currentIndex === remainingQuestions.length ? 0 : currentIndex;
    let correctCount = correctAnswered;
    let incorrectCount = incorrectAnswered;

    if (currentQuestion.id === answer.id) {
      correctCount = correctAnswered + 1;
    } else {
      incorrectQuestions.push(currentQuestion);
      incorrectCount = incorrectAnswered + 1;
    }
     this.setState({
      questions: remainingQuestions,
      currentQuestion: remainingQuestions[index],
      currentIndex: index,
      correctAnswered: correctCount,
      incorrectAnswered: incorrectCount,
      incorrectQuestions: incorrectQuestions,
    })
  }

  tick = () => {
    let min = Math.floor(this.secondsRemaining / 60);
    let sec = this.secondsRemaining - (min * 60)

    this.setState({
      minutes: min,
      seconds: sec
    });

    if (sec < 10) {
      this.setState({
        seconds: "0" + this.state.seconds
      })
    }

    if (min === 0 & sec === 0 || !this.state.questions.length) {
      clearInterval(this.handleInterval);
    }

    this.secondsRemaining--
  }


  hideSplash = () => {
    this.setState({
      showSplash: false
    })

    this.handleInterval = setInterval(this.tick, 1000);
    let time = this.state.minutes;
    this.secondsRemaining = time * 60 + parseInt(this.state.seconds);
  }
  
  renderApp() {
    const { questions, answers, currentQuestion, currentIndex, correctAnswered, incorrectAnswered, seconds, minutes } = this.state;
    return (
        <div className='app-container'>
          <Header />
          <GameStatus questions={questions}
                      correctAnswered={correctAnswered}
                      incorrectAnswered={incorrectAnswered}
                      minutes={minutes}
                      seconds={seconds}
                      tick={this.tick}/>

          <QuestionContainer questions={questions} 
                             currentQuestion={currentQuestion}
                             correctAnswered={correctAnswered}
                             currentIndex={currentIndex}
                             setCurrent={this.setCurrent}
                             minutes={minutes}
                             seconds={seconds} />
          <AnswerBank answers={answers}
                      validateAnswer={this.validateAnswer}
                      currentQuestion={currentQuestion}
                      minutes={minutes}
                      seconds={seconds} />
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

