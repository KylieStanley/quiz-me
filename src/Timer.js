import React, { Component } from 'react';
import './styles/main.scss';


export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: '00',
      minutes: '4'
    };
  }

  componentWillMount () {
    this.setState({ seconds: this.props.answers, minutes: this.props.minutes});
  }

  // componentDidMount = () => {
  //   this.handleInterval = setInterval(this.props.tick, 1000);
  //   let time = this.props.minutes;
  //   this.secondsRemaining = time * 60 + parseInt(this.props.seconds);
  // }

  // tick = () => {
  //   let min = Math.floor(this.secondsRemaining / 60);
  //   let sec = this.secondsRemaining - (min * 60)

  //   this.setState({
  //     minutes: min,
  //     seconds: sec
  //   });

  //   if (sec < 10) {
  //     this.setState({
  //       seconds: "0" + this.props.seconds
  //     })
  //   }

  //   if (min === 0 & sec === 0 || !this.props.questions.length) {
  //     clearInterval(this.handleInterval);
  //   }

  //   this.secondsRemaining--
  // }

  render() {
    return (
      <h2>{this.props.minutes}:{this.props.seconds}</h2>

    );
  }
}