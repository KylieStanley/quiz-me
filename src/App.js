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
      incorrectAnswered: 0
    }
  }

  componentDidMount = () => {
    fetch("http://memoize-datasets.herokuapp.com/api/v1/questions")
      .then(data => data.json())
      .then(data => {
        this.setState({
          questions: data.questions,
          currentQuestion: data.questions[0]
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

  setCurrent = (newQuestion) => {
    this.setState({
      currentQuestion: newQuestion
    })
  }

  validateAnswer = (answer,e) => {
    if (this.state.currentQuestion.id === answer.id) {
      console.log('correct!')
      e.target.disabled = true;
      
      this.setState({
        correctAnswered: this.state.correctAnswered + 1
      })
    } else {
      console.log('wrong')
      
      this.setState({
        incorrectAnswered: this.state.incorrectAnswered + 1
      })
    }
  }

  hideSplash = () => {
    this.setState({
      showSplash: false
    })
  }
  
  renderApp() {
    return (
        <div className='app-container'>
          <Header />
          <GameStatus />
          <QuestionContainer questions={this.state.questions} 
                             setCurrent={this.setCurrent}/>
          <AnswerBank answers={this.state.answers}
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

