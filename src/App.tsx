import React, { useEffect } from 'react';
import './App.css';

import { Network } from "./lib/network";
import { networkOptions } from "./config";
import LogView from './components/LogView/LogView';
import NetworkView from './components/NetworkView/NetworkView';
import LossView from './components/LossView/LossView';
import OutputView from "./components/OutputView/OutputView";

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
const errorDataset: number[] = [];
const outputDataset: number[][] = targets.map(() => {
  return [];
});

for (let i = 0; i < networkOptions.learningLimit; i++) {
  network.forwardPropagation();
  network.backPropagation();

  errorDataset.push(network.getError());
  network.getResults().forEach((output: number, index: number) => {
    outputDataset[index].push(output);
  });
}

const App: React.FC = () => {
  useEffect(() => {
    console.log('============================== Result ==================================');
    console.log(`Loss: ${network.getError()}`);
    console.log(`Inputs: [${inputs}]`);
    console.log(`Outputs: [${network.getResults()}]`);
    console.log(`Targets: [${targets}]`);
    console.log('========================================================================');
  }, []);

  return (
    <div className="App">
      <div className="wrapper">
        <div className="viewer" data-name="network">
          <div id="network-display" className="border-box">
            <h3>Network</h3>
            <NetworkView nodes={networkDataset.nodes} links={networkDataset.links} />
          </div>
        </div>
        <div className="viewer" data-name="charts">
          <div id="loss-rate-chart" className="chart-wrapper border-box">
            <h3>Error Loss</h3>
            <LossView losses={errorDataset} />
          </div>
          <div id="output-chart" className="chart-wrapper border-box">
            <h3>Outputs</h3>
            <OutputView outputs={outputDataset}/>
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
};

export default App;
