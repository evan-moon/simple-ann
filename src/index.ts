import 'src/styles';
import { networkOptions } from 'config';
import { Network } from 'lib/network';
import { Chart } from 'graphics/chart';

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
  const errors: number[] = [];
  const results: number[][] = targets.map(() => {
    return [];
  });

  for (let i = 0; i < networkOptions.learningLimit; i++) {
    network.forwardPropagation();
    network.backPropagation();

    errors.push(network.getError());
    network.getResults().forEach((output: number, index: number) => {
      results[index].push(output);
    });
    console.log(`[${i}] Error: ${network.getError()}`);
  }
  console.log(results);

  console.log('============================== Result ==================================');
  console.log('Loss: ', network.getError());
  console.log('Inputs: ', inputs);
  console.log('Outputs: ', network.getResults());
  console.log('Targets: ', targets);
  console.log('========================================================================');

  // Render chart
  function draw () {
    // Render Error Chart
    const errorChart = new Chart('#loss-rate-chart');
    errorChart.render();
    errorChart.drawLine([{ label: 'Loss', data: errors }]);

    // Render Output Chart
    const outputChart = new Chart('#output-chart');
    outputChart.render();
    outputChart.drawLine(results.map((r: number[], index: number) => {
      return {
        label: `output${index}`,
        data: r,
      };
    }));
  }

  draw();
}

init();
