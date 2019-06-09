import React from 'react';
import './LogView.css';

class LogView extends React.Component {
  componentDidMount () {
    const logger = document.getElementById('logView');
    const old = console.log;
    if (!logger) {
      return;
    }

    console.log = function (message: string) {
      old(message);
      if (typeof message === 'object') {
        logger.innerHTML += (JSON.stringify ? JSON.stringify(message) : message) + '<br />';
      } else {
        logger.innerHTML += message + '<br />';
      }
    };
  }

  render () {
    return (
      <div id="logView"></div>
    )
  }
}

export default LogView;
