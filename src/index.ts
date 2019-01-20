import 'src/styles';
import { networkOption } from 'config';
import { Network } from 'lib/network';
// import * as d3 from 'd3';

function init () {
  console.log('App initialize Start');
  // generate randomic inputs
  const inputs: number[] = [];
  const targets: number[] = networkOption.targets;
  for (let i = 0; i < targets.length; i++) {
    inputs.push(Math.random() + targets[i]);
  }

  // generate network
  const network = new Network(targets, inputs);
  network.createNodes(networkOption.layerCount, networkOption.nodePerLayer);
  network.setLearningRate(networkOption.learningRate);

  for (let i = 0; i < networkOption.learningLimit; i++) {
    network.forwardPropagation();
    network.backPropagation();
    console.log(`[${i}] Error: ${network.getError()}`);
  }

  console.log('============================== RESULT ==================================');
  console.log('Inputs: ', inputs);
  console.log('Results: ', network.getResults());
  console.log('Loss: ', network.getError());
  console.log('Targets: ', targets);
  console.log('========================================================================');
}

init();
