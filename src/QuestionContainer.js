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

  prevSlide = () => {
    const lastIndex = this.props.questions.length - 1;
    const { currentIndex } = this.state;
    const shouldResetIndex = currentIndex === 0;
    const index =  shouldResetIndex ? lastIndex : currentIndex - 1;

    this.setState({
      currentIndex: index,
      currentQuestion: this.props.questions[index]
    });

    this.props.setCurrent(this.props.questions[index], index);
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
    
    this.props.setCurrent(this.props.questions[index], index);
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps.current, this.props.currentIndex)
    if (this.props.currentIndex !== prevProps.currentIndex) {
      this.setState({
        currentIndex: this.props.currentIndex
      })
    }
  }

  render() {
    let index = !this.props.questions[this.state.currentIndex] ? 0 : this.state.currentIndex;
    return (
      <div className="question-container">
        <Question currentQuestion={this.props.questions[index]} />
        <div>
          <button className="carousel-btn" onClick={this.prevSlide}><i className="fas fa-arrow-alt-circle-left"></i>Prev</button>    
          <button className="carousel-btn" onClick={this.nextSlide}>Next<i className="fas fa-arrow-alt-circle-right"></i></button>
        </div>
      </div>
    );
  }
}





  // componentWillMount () {
  //   this.setState({ 
  //     currentIndex: 0,
  //     currentQuestion: this.props.currentQuestion
  //   });
  // }

  // 