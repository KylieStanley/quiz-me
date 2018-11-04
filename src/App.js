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
    if (this.state.currentQuestion.id === answer.id && this.state.questions.length > 0) {
      e.target.disabled = true;
      e.target.classList.add('right-answer');
      const remainingQuestions = this.state.questions.filter(question => question != this.state.currentQuestion)
      let index = this.state.currentIndex === remainingQuestions.length ? 0 : this.state.currentIndex;

      this.setState({
        correctAnswered: this.state.correctAnswered + 1,
        questions: remainingQuestions,
        currentQuestion: remainingQuestions[index],
        currentIndex: index
      })

    } else {
      
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
                             currentQuestion={this.state.currentQuestion}
                             currentIndex={this.state.currentIndex}
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

