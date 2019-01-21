import 'src/styles';
import { networkOptions } from 'config';
import { Network } from 'lib/network';
import * as d3 from 'd3';
import { LineChart } from 'graphics/lineChart';

function init () {
  console.log('Network leaning Start');
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

  // chart dataset
  const errors = [];

  for (let i = 0; i < networkOptions.learningLimit; i++) {
    network.forwardPropagation();
    network.backPropagation();

    errors.push({ count: i, value: network.getError() });
    console.log(`[${i}] Error: ${network.getError()}`);
  }

  console.log('============================== Result ==================================');
  console.log('Loss: ', network.getError());
  console.log('Inputs: ', inputs);
  console.log('Outputs: ', network.getResults());
  console.log('Targets: ', targets);
  console.log('========================================================================');

  // Render chart
  function draw () {
    const errorChart = new LineChart('#loss-rate-chart');
    errorChart.render({
      label: { x: 'Count', y: 'Loss' },
      values: errors,
    }, '#fa5963');
  }
  draw();
}

init();
