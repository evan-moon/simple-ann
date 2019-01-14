import { Neuron } from 'lib/neuron';

export class Layer {
  private neurons: Neuron[];
  private prevLayer: Layer;
  private nextLayer: Layer;

  public length: number;

  constructor () {
    this.neurons = [];
    this.length = 0;
  }

  pushNeuron (neuron: Neuron) {
    this.neurons.push(neuron);
    this.length = this.neurons.length;
  }

  setInputs (inputs: number[]) {
    this.neurons.forEach(n => n.setInputs(inputs));
  }

  setPrevLayer (layer: Layer) {
    this.prevLayer = layer;
  }
  setNextLayer (layer: Layer) {
    this.nextLayer = layer;
  }
}
