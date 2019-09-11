import './App.css';

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Network } from "./lib/network";
import { networkOptions } from "./config";
import LogView from './components/LogView/LogView';
import NetworkView from './components/NetworkView/NetworkView';
import LossView from './components/LossView/LossView';
import OutputView from "./components/OutputView/OutputView";
import store from './store';
import { setInputs, setNodeGraphicData, updateErrorDataset, updateOutputDataset, setLearningResult, setTotalLoss } from './actions';

console.log('Network leaning Start...');

function initNetwork () {
  const state = store.getState();
  const { targets, layerCount, nodePerLayer, learningRate } = state;

  const inputs = targets.map(target => Math.random() + target);
  store.dispatch(setInputs(inputs));

  const network = new Network(targets, inputs);
  network.createNodes(layerCount, nodePerLayer);
  network.setLearningRate(learningRate);

  const networkDataset = network.getNetworkGraphicData();
  store.dispatch(setNodeGraphicData(networkDataset));

  const errorDataset: number[] = [];
  const outputDataset: number[][] = targets.map(() => {
    return [];
  });

  for (let i = 0; i < networkOptions.learningLimit; i++) {
    network.forwardPropagation();
    network.backPropagation();
  
    errorDataset.push(network.getTotalLoss());
    network.getResults().forEach((output: number, index: number) => {
      outputDataset[index].push(output);
    });
  }

  store.dispatch(updateErrorDataset(errorDataset));
  store.dispatch(updateOutputDataset(outputDataset));
  store.dispatch(setLearningResult(network.getResults()));
  store.dispatch(setTotalLoss(network.getTotalLoss()))
}

initNetwork();

interface AppProps {
  storeState: any;
};

const App: React.FC<AppProps> = (props) => {
  const { storeState } = props;
  const {
    inputs,
    targets,
    nodeGraphicData,
    errorDataset,
    outputDataset,
    learningResult,
    totalLoss
  } = storeState;

  useEffect(() => {
    console.log('============================== Result ==================================');
    console.log(`Loss: ${totalLoss}`);
    console.log(`Inputs: [${inputs}]`);
    console.log(`Outputs: [${learningResult}]`);
    console.log(`Targets: [${targets}]`);
    console.log('========================================================================');
  });

  return (
    <div className="App">
      <div className="wrapper">
        <div className="viewer" data-name="network">
          <div id="network-display" className="border-box">
            <h3>Network</h3>
            <NetworkView nodes={nodeGraphicData.nodes} links={nodeGraphicData.links} />
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

const mapStateToProps = (state: any): AppProps => {
  return {
    storeState: state,
  };
};

export default connect(mapStateToProps)(App);
