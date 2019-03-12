import React, { Component } from 'react';
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
      allQuestions: [],
      questions: [],
      allAnswers: [],
      answers: [],
      currentQuestion: {},
      correctAnswered: 0,
      incorrectAnswered: 0,
      currentIndex: 0,
      incorrectQuestions: [],
      minutes: '4',
      seconds: '00',
      tryAgainClass: 'all'
    }
  }

  componentDidMount = () => {
    fetch("https://memoize-datasets.herokuapp.com/api/v1/questions")
      .then(data => data.json())
      .then(data => {
        this.setState({
          allQuestions: data.questions,
          questions: data.questions,
          currentQuestion: data.questions[0],
        })
      })
      .catch(err => console.log(err))

    fetch("https://memoize-datasets.herokuapp.com/api/v1/answers")
      .then(data => data.json())
      .then(data => {
        this.setState({
          allAnswers: data.answers,
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
            incorrectAnswered } = this.state;
    const remainingQuestions = questions.filter(question => question !== currentQuestion);
    let index = currentIndex === remainingQuestions.length ? 0 : currentIndex;
    let correctCount = correctAnswered;
    let incorrectCount = incorrectAnswered;

    if (currentQuestion.id === answer.id) {
      correctCount = correctAnswered + 1;
      this.removeFromLocalStorage(currentQuestion);
    } else {
      this.saveToLocalStorage(currentQuestion);
      incorrectCount = incorrectAnswered + 1;
    }
     this.setState({
      questions: remainingQuestions,
      currentQuestion: remainingQuestions[index],
      currentIndex: index,
      correctAnswered: correctCount,
      incorrectAnswered: incorrectCount
    })
  }

  saveToLocalStorage = (currentQuestion) => {
    localStorage.setItem(`${currentQuestion.id}`, JSON.stringify(currentQuestion));
  }

  getFromLocalStorage = () => {
    let incorrectQuestions = [];
    for (let i = 0; i < localStorage.length; i++) {
      let parsed = JSON.parse(localStorage.getItem(localStorage.key(i)))
      incorrectQuestions.push(parsed)
    }
    this.setState({
      incorrectQuestions: incorrectQuestions   
    }, this.modifyQuestions)
  }

  removeFromLocalStorage = (currentQuestion) => {
    localStorage.removeItem(currentQuestion.id)
  }

  startTimer = () => {
    this.handleInterval = setInterval(this.tick, 1000);
    let time = this.state.minutes;
    this.secondsRemaining = time * 60 + parseInt(this.state.seconds);
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

  modifyQuestions = (e) => {
    let newStudyQuestions = this.state.allQuestions;
    let newStudyAnswers = this.state.allAnswers;
    let questionType = 'all'
    if (e) {
      questionType = e.target.className;
    }

    if (questionType.indexOf('all') < 0 && questionType.indexOf('incorrect') < 0) {
      newStudyQuestions = this.state.allQuestions.filter(question => {
        return questionType.indexOf(question.category) > -1;
      })
      newStudyAnswers = this.state.allAnswers.filter(answer => {
        return questionType.indexOf(answer.category) > -1;
      })
    } else if (questionType.indexOf('incorrect') >= 0) {
        newStudyQuestions = this.state.incorrectQuestions;
        newStudyAnswers = this.state.allAnswers.filter(answer => {
          let match = newStudyQuestions.find(question => {
            return answer.id === question.id;
          })
          return match;
        })
    }

    this.setState({
      questions: newStudyQuestions,
      answers: newStudyAnswers,
      currentQuestion: newStudyQuestions[0],
      correctAnswered: 0,
      incorrectAnswered: 0,
      currentIndex: 0,
      minutes: '4',
      seconds: '00',
      tryAgainClass: questionType
    }, this.startTimer) 

    clearInterval(this.handleInterval)
  }

  hideSplash = () => {
    this.setState({
      showSplash: false
    })
    this.startTimer();
  }
  
  renderApp() {
    const { questions, answers, currentQuestion, currentIndex, correctAnswered, 
            incorrectAnswered, seconds, minutes, tryAgainClass } = this.state;
    return (
        <div className='app-container'>
          <Header modifyQuestions={this.modifyQuestions} 
                  getFromLocalStorage={this.getFromLocalStorage}/>
          <GameStatus questions={questions}
                      answers={answers}
                      correctAnswered={correctAnswered}
                      incorrectAnswered={incorrectAnswered}
                      minutes={minutes}
                      seconds={seconds}
                      tick={this.tick} />
          <QuestionContainer questions={questions} 
                             answers={answers}
                             currentQuestion={currentQuestion}
                             correctAnswered={correctAnswered}
                             modifyQuestions={this.modifyQuestions}
                             currentIndex={currentIndex}
                             setCurrent={this.setCurrent}
                             minutes={minutes}
                             seconds={seconds} 
                             tryAgainClass={tryAgainClass}/>
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

