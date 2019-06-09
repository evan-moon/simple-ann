import React from 'react';
import './App.css';

import { Network } from "./lib/network";
import { networkOptions } from "./config";
import LogView from './components/LogView/LogView';
import NetworkView from './components/NetworkView/NetworkView';

console.log('Network leaning Start...');

// generate randomic inputs
const inputs: number[] = [];
const targets: number[] = networkOptions.targets;
for (let i = 0; i < targets.length; i++) {
  inputs.push(Math.random() + targets[i]);
}

// generate network
const network = new Network(targets, inputs);
network.createNodes(networkOptions.layerCount, networkOptions.nodePerLayer);
network.setLearningRate(networkOptions.learningRate);

// make chart dataset
const networkDataset = network.getNetworkGraphicData();
// const errorDataset: number[] = [];
// const outputDataset: number[][] = targets.map(() => {
//   return [];
// });

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="wrapper">
        <div className="viewer" data-name="network">
          <div id="network-display" className="border-box">
            <h3>Network</h3>
            <NetworkView nodes={networkDataset.nodes} links={networkDataset.links} />
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
