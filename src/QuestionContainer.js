import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles/main.scss';
import PropTypes from 'prop-types';
import Question from './Question.js';

class QuestionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      currentQuestion: {}
    };
  }

  changeSlide = e => {
    const lastIndex = this.props.questions.length - 1;
    const { currentIndex } = this.state;
    let index;

    if (e.target.classList.contains('next')) {
      const shouldResetIndex = currentIndex === lastIndex;
      index = shouldResetIndex ? 0 : currentIndex + 1;
    } else {
      const shouldResetIndex = currentIndex === 0;
      index = shouldResetIndex ? lastIndex : currentIndex - 1;
    }

    this.setState({
      currentIndex: index,
      currentQuestion: this.props.questions[index]
    });

    this.props.setCurrent(this.props.questions[index], index);
  };

  componentDidUpdate(prevProps) {
    if (this.props.currentIndex !== prevProps.currentIndex) {
      this.setState({
        currentIndex: this.props.currentIndex
      });
    }
  }

  render() {
    let index = !this.props.questions[this.state.currentIndex]
      ? 0
      : this.state.currentIndex;
    if (
      (this.props.seconds === '00' && this.props.minutes === 0) ||
      !this.props.currentQuestion
    ) {
      return (
        <div className="question-container">
          <h2 className="your-score">
            Your score was{' '}
            {Math.floor(
              (this.props.correctAnswered / this.props.answers.length) * 100
            )}
            %
          </h2>
          <button
            className={`carousel-btn ${this.props.tryAgainClass}`}
            onClick={this.props.modifyQuestions}
          >
            Try Again
          </button>
        </div>
      );
    } else {
      return (
        <div className="question-container">
          <Question currentQuestion={this.props.questions[index]} />
          <div>
            <button
              className="carousel-btn prev"
              onClick={e => this.changeSlide(e)}
            >
              <i className="fas fa-arrow-alt-circle-left prev" />
              Prev
            </button>
            <button
              className="carousel-btn next"
              onClick={e => this.changeSlide(e)}
            >
              Next
              <i className="fas fa-arrow-alt-circle-right next" />
            </button>
          </div>
        </div>
      );
    }
  }
}

export const mapStateToProps = state => ({
  questions: state.questions,
  answers: state.answers
});

export default connect(mapStateToProps)(QuestionContainer);

QuestionContainer.propTypes = {
  minutes: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  seconds: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  validateAnswer: PropTypes.func,
  currentQuestion: PropTypes.object,
  answers: PropTypes.array,
  questions: PropTypes.array,
  correctAnswered: PropTypes.number,
  modifyQuestions: PropTypes.func,
  currentIndex: PropTypes.number,
  setCurrent: PropTypes.func,
  tryAgainClass: PropTypes.string
};
