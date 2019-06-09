import React from 'react';
import './App.css';
import LogView from './components/LogView';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="wrapper">
        <div className="viewer" data-name="network">
          <div id="network-display" className="border-box">
            <h3>Network</h3>
            <div data-name="chart"></div>
          </div>
          <div>
            <button id="reset-button">Reset</button>
          </div>
        </div>
        <div className="viewer" data-name="charts">
          <div id="loss-rate-chart" className="chart-wrapper border-box">
            <h3>Error Loss</h3>
            <div data-name="chart"></div>
          </div>
          <div id="output-chart" className="chart-wrapper border-box">
            <h3>Outputs</h3>
            <div data-name="chart"></div>
          </div>
        </div>
        <div className="viewer" data-name="logger">
          <div id="console" className="border-box">
            <h3>Console</h3>
            <LogView />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
