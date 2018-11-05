import React, { Component } from 'react';
import './styles/main.scss';


export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: '30',
      minutes: '4'
    };
  }

  componentDidMount = () => {
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

    if (min === 0 & sec === 0) {
      clearInterval(this.handleInterval);
    }

    this.secondsRemaining--
  }

  render() {
    return (
      <h4>{this.state.minutes}:{this.state.seconds}</h4>

    );
  }
}