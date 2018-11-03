import React, { Component } from 'react';
import './styles/main.scss';
import Question from './Question.js'


export default class QuestionContainer extends Component {
  constructor (props) {
    super(props);

    this.state = {
      currentIndex: 0,
      currentQuestion: this.props.questions[0]
    };
  }

    prevSlide = () => {
      const lastIndex = this.props.questions.length - 1;
      const { currentIndex } = this.state;
      const shouldResetIndex = currentIndex === 0;
      const index =  shouldResetIndex ? lastIndex : currentIndex - 1;

      this.setState({
        currentIndex: index,
        currentQuestion: this.props.questions[index]
      });
    }

    nextSlide = () => {
      const lastIndex = this.props.questions.length - 1;
      const { currentIndex } = this.state;
      const shouldResetIndex = currentIndex === lastIndex;
      const index =  shouldResetIndex ? 0 : currentIndex + 1;

      this.setState({
        currentIndex: index,
        currentQuestion: this.props.questions[index]
      });
    }

  render() {
    return (
      <div className="question-container">
        <Question currentQuestion={this.props.questions[this.state.currentIndex]} />
        <div>
          <button className="carousel-btn" onClick={this.prevSlide}><i className="fas fa-arrow-alt-circle-left"></i>Prev</button>    
          <button className="carousel-btn" onClick={this.nextSlide}>Next<i className="fas fa-arrow-alt-circle-right"></i></button>
        </div>
      </div>
    );
  }
}