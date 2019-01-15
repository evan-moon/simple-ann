import { Neuron } from 'lib/neuron';
import { MeanSquaredError } from 'lib/math';

export class Layer {
  public id: string;
  public isOutputLayer: boolean;
  private neurons: Neuron[];
  private prevLayer: Layer;
  private nextLayer: Layer;
  public length: number;

  constructor (id: string, isOutputLayer = false) {
    this.id = id;
    this.isOutputLayer = isOutputLayer;
    this.neurons = [];
    this.length = 0;
  }

  public pushNeuron (neuron: Neuron) {
    this.neurons.push(neuron);
    this.length = this.neurons.length;
  }

  public setInputs (inputs: number[]) {
    this.neurons.forEach(neuron => neuron.setInputs(inputs));
  }

  public setPrevLayer (layer: Layer) {
    this.prevLayer = layer;
  }

  public setNextLayer (layer: Layer) {
    this.nextLayer = layer;
  }

  public calc () {
    this.neurons.forEach((neuron, i) => {
      neuron.calc();
    });

    const results = this.getResults();
    if (this.nextLayer) {
      this.nextLayer.setInputs(results);
    }
  }

  public getResults () {
    return this.neurons.map(neurons => neurons.getCalcedResult());
  }

  public getLoss () {}

  public updateWeights () {
    if (this.isOutputLayer) {
      console.log(0);
    } else {
      console.log(1);
    }
  }
}
