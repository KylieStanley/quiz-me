import React, { Component } from 'react';
import './styles/main.scss';
import Question from './Question.js'


export default class QuestionContainer extends Component {
  constructor (props) {
    super(props);

    this.state = {
      currentIndex: 0,
      currentQuestion: {}
    };
  }

  changeSlide = (e) => {
    const lastIndex = this.props.questions.length - 1;
    const { currentIndex } = this.state;
    let index;

    if (e.target.classList.contains('next')) {
      const shouldResetIndex = currentIndex === lastIndex;
      index =  shouldResetIndex ? 0 : currentIndex + 1; 
    } else {
      const shouldResetIndex = currentIndex === 0;
      index =  shouldResetIndex ? lastIndex : currentIndex - 1;
    }
    
    this.setState({
      currentIndex: index,
      currentQuestion: this.props.questions[index]
    });
    
    this.props.setCurrent(this.props.questions[index], index);
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentIndex !== prevProps.currentIndex) {
      this.setState({
        currentIndex: this.props.currentIndex
      })
    }
  }

  render() {
    if (this.props.currentQuestion) {
    let index = !this.props.questions[this.state.currentIndex] ? 0 : this.state.currentIndex;
      return (
        <div className="question-container">
          <Question currentQuestion={this.props.questions[index]} 
                    correctAnswered={this.props.correctAnswered} />
          <div>
            <button className="carousel-btn prev" onClick={(e)=>this.changeSlide(e)}><i className="fas fa-arrow-alt-circle-left prev"></i>Prev</button>    
            <button className="carousel-btn next" onClick={(e)=>this.changeSlide(e)}>Next<i className="fas fa-arrow-alt-circle-right next"></i></button>
          </div>
        </div>
      );
    } else {
        return (
          <div className="question-container">
            <h4>Your score was { 
              (Math.floor((this.props.correctAnswered / 31) * 100))
              }%
            </h4>
          <button className="carousel-btn">Try Again</button>
        </div>
      );
    }  
  }
}



  // componentWillMount () {
  //   this.setState({ 
  //     currentIndex: 0,
  //     currentQuestion: this.props.currentQuestion
  //   });
  // }

  // 