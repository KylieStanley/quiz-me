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
      answers: []
    }
  }


  componentDidMount = () => {
    fetch("http://memoize-datasets.herokuapp.com/api/v1/questions")
      .then(data => data.json())
      .then(data => {
        this.setState({
          questions: data.questions
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
  
  renderApp() {
    return (
        <div className='app-container'>
          <Header />
          <GameStatus />
          <QuestionContainer />
          <AnswerBank answers={this.state.answers}/>
        </div>
      )
  }

  hideSplash = () => {
    this.setState({
      showSplash: false
    })
  }

  render() {
    return (
      this.state.showSplash ? <Splash hideSplash={this.hideSplash}/> : this.renderApp()     
    );
  }
}

export default App;

