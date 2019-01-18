import { Neuron } from 'lib/neuron';
import { MeanSquaredError } from 'lib/math';

export class Layer {
  public id: string;
  public prevLayer: Layer;
  public nextLayer: Layer;
  public length: number;
  private neurons: Neuron[];

  constructor (id: string) {
    this.id = id;
    this.neurons = [];
    this.length = 0;
  }

  public pushNeuron (neuron: Neuron) {
    this.neurons.push(neuron);
    this.length = this.neurons.length;
  }

  public setInputs (inputs: number[]) {
    console.log('inputs -> ', inputs);
    this.neurons.forEach(neuron => neuron.setInputs(inputs));
  }

  public setPrevLayer (layer: Layer) {
    this.prevLayer = layer;
  }

  public setNextLayer (layer: Layer) {
    this.nextLayer = layer;
  }

  public calc () {
    this.neurons.forEach(neuron => {
      neuron.calc();
    });

    const results = this.getResults();
    if (this.nextLayer) {
      console.log('results -> ', results);
      this.nextLayer.setInputs(results);
    }
  }

  public getResults () {
    return this.neurons.map(neurons => neurons.getCalcedResult());
  }

  public getForwardLoss (targets: number[]) {
    const results = this.getResults();
    return {
      forward: MeanSquaredError(targets, results),
      prime: MeanSquaredError(targets, results, true),
    };
  }

  public getLoss () {
    return this.neurons.reduce((a: number, b: Neuron, currentIndex: number) => {
      return a + b.getWeightPrimes()[currentIndex];
    }, 0);
  }

  public updateWeights (lossPrime: number, learningRate) {
    // 마지막 Layer는 스칼라인 E에 대한 LossPrime이 들어옴
    // not 마지막 Layer는 전 레이어의 E에 대한 LossPrime의 합이 들어옴
    this.neurons.forEach(neuron => neuron.updateWeights(lossPrime, learningRate));
  }
}
