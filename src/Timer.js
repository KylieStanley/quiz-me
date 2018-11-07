import React from 'react';
import PropTypes from 'prop-types';
import './styles/main.scss';


const Timer = (props) => {
  return (
    <h2>{props.minutes}:{props.seconds}</h2>
  );
}

export default Timer;


Timer.propTypes = {
   minutes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
   seconds: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
}
