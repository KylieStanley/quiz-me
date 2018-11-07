import React from 'react';
import './styles/main.scss';


const Timer = (props) => {
  return (
    <h2>{props.minutes}:{props.seconds}</h2>
  );
}

export default Timer;