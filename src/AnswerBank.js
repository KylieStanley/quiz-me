import React, { Component } from 'react';
import { connect } from 'react-redux';
import Answer from './Answer.js';
import PropTypes from 'prop-types';
import './styles/main.scss';

class AnswerBank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: null
    };
  }

  shuffleArray = array => {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  componentWillMount() {
    this.setState({ answers: this.shuffleArray(this.props.answers) });
  }

  componentDidUpdate(prevProps) {
    if (this.props.answers !== prevProps.answers) {
      this.setState({
        answers: this.props.answers
      });
    }
  }

  render() {
    return (
      <div className="answer-wrapper">
        <div className="answer-container">
          {this.state.answers.map(answer => {
            return (
              <Answer
                answer={answer}
                currentQuestion={this.props.currentQuestion}
                validateAnswer={this.props.validateAnswer}
                minutes={this.props.minutes}
                seconds={this.props.seconds}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  answers: state.answers
});

export default connect(mapStateToProps)(AnswerBank);

AnswerBank.propTypes = {
  minutes: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  seconds: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  validateAnswer: PropTypes.func,
  currentQuestion: PropTypes.object,
  answers: PropTypes.array
};
