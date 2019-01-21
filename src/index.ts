import 'src/styles';
import { networkOptions } from 'config';
import { Network } from 'lib/network';
import { Chart } from 'graphics/chart';
import { Graph } from 'graphics/graph';

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

  // make chart dataset
  const networkDataset = network.getNetworkGraphicData();
  const errorDataset: number[] = [];
  const outputDataset: number[][] = targets.map(() => {
    return [];
  });

  // render network
  console.log(networkDataset);
  const graph = new Graph('network-display', networkDataset.nodes, networkDataset.links);
  graph.render();

  for (let i = 0; i < networkOptions.learningLimit; i++) {
    network.forwardPropagation();
    network.backPropagation();

    errorDataset.push(network.getError());
    network.getResults().forEach((output: number, index: number) => {
      outputDataset[index].push(output);
    });
    // console.log(`[${i}] Error: ${network.getError()}`);
  }

  console.log('============================== Result ==================================');
  console.log('Loss: ', network.getError());
  console.log('Inputs: ', inputs);
  console.log('Outputs: ', network.getResults());
  console.log('Targets: ', targets);
  console.log('========================================================================');

  // Render chart
  function draw () {
    // Render Error Chart
    const errorChart = new Chart('loss-rate-chart');
    errorChart.render();
    errorChart.drawLine([{ label: 'Loss', data: errorDataset }]);

    // Render Output Chart
    const outputChart = new Chart('output-chart');
    outputChart.render();
    outputChart.drawLine(outputDataset.map((r: number[], index: number) => {
      return {
        label: `output${index}`,
        data: r,
      };
    }));
  }

  draw();
}

init();
