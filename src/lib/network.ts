import { networkOption } from 'config';
import { Neuron } from 'lib/neuron';
import { Layer } from 'lib/layer';

// generate randomic inputs
const inputs: number[] = [];
const targets: number[] = networkOption.targets;
for (let i = 0; i < targets.length; i++) {
  inputs.push(Math.random() + targets[i]);
}

// create Layers
const layers = [];
for (let i = 0; i < networkOption.layerCount; i++) {
  const layer: Layer = new Layer();
  for (let j = 0; j < networkOption.nodePerLayer; j++) {
    const neuron = new Neuron(`neuron-[${i}][${j}]`, [Math.random(), Math.random()]);
    layer.pushNeuron(neuron);
  }
  layers.push(layer);
}

layers.forEach((layer, layerIndex) => {
  layer.forEach(neuron => {
    const prevLayer = layers[layerIndex - 1];
    const nextLayer = layers[layerIndex + 1];
    if (prevLayer) {
      neuron.setParents(prevLayer);
    }
    if (nextLayer) {
      neuron.setChildren(nextLayer);
    }
  });
});

// set Inputs to neuron in first layer
layers[0].forEach(v => {
  v.setInputs(inputs);
});

console.log(layers);

// start front propagation
layers.forEach((layer, layerIndex) => {
  const results = [];
  layer.forEach(neuron => {
    neuron.calc();
    results.push(neuron.getCalcedResult());
  });
  if (layer[layerIndex + 1]) {
    layer[layerIndex + 1].forEach(neuron => {
      neuron.setInputs(results);
      neuron.calc();
    });
  }
});

// const testNeuron = new Neuron('test', [Math.random(), Math.random()]);
// testNeuron.setInputs(inputs);
// testNeuron.calc();
