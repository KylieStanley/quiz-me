import React, { Component } from 'react';
import './styles/main.scss';


export default class Timer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h2>{this.props.minutes}:{this.props.seconds}</h2>
    );
  }
}