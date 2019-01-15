import { networkOption } from 'config';
import { Neuron } from 'lib/neuron';
import { Layer } from 'lib/layer';
import { MeanSquaredError } from 'lib/math';

// generate randomic inputs
const inputs: number[] = [];
const targets: number[] = networkOption.targets;
for (let i = 0; i < targets.length; i++) {
  inputs.push(Math.random() + targets[i]);
}

// create Layers
const layers = [];
for (let i = 0; i < networkOption.layerCount; i++) {
  const isLastIndex = i === networkOption.layerCount - 1;
  const layer: Layer = new Layer(`layer-${i}`, isLastIndex);
  for (let j = 0; j < networkOption.nodePerLayer; j++) {
    const neuron = new Neuron(`neuron-[${i}][${j}]`, [Math.random(), Math.random()]);
    layer.pushNeuron(neuron);
  }
  if (i === 0) {
    layer.setInputs(inputs);
  }
  layers.push(layer);
}

layers.forEach((layer, layerIndex) => {
  const prevLayer = layers[layerIndex - 1];
  const nextLayer = layers[layerIndex + 1];

  if (prevLayer) {
    layer.setPrevLayer(prevLayer);
  }
  if (nextLayer) {
    layer.setNextLayer(nextLayer);
  }
});

// Start Forward Propagation
console.log(' -> Start Front Propagation');
layers.forEach(layer => {
  layer.calc();
});

// Get loss
const lastLayer = layers[layers.length - 1];
const results = lastLayer.getResults();
console.log('Front Propagation result ->', results);
const loss = lastLayer.getLoss();
// @TODO 로스 미분 값 구하기 2/n sigma_{i=0}^{n}(output -target)
// https://ml-cheatsheet.readthedocs.io/en/latest/loss_functions.html#mse-l2
console.log('Front Propagation loss -> ', loss);

// start back propagation
console.log(' -> Back propagation Start');
// reverse loop start
[...layers].reverse().forEach(layer => {
  console.log(layer);
  layer.updateWeights();
});

// const testNeuron = new Neuron('test', [Math.random(), Math.random()]);
// testNeuron.setInputs(inputs);
// testNeuron.calc();
