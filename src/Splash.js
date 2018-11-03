import React, { Component } from 'react';
import './styles/main.scss';


export default class Splash extends Component {
  render() {
    return (
      <div className="splash-container">
        <h1>quiz me</h1>
        <h3>A Fun Timed Game for Testing Your Javascript Knowledge</h3>
        <button className="splash-btn" onClick={this.props.hideSplash}>Start!</button>
      </div>
    );
  }
}