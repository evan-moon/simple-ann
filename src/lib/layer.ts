import { Neuron } from './neuron';
import { MeanSquaredError, MeanSquaredErrorPrimes } from './math';

export class Layer {
  public id: string = '';
  public prevLayer: Layer|null = null;
  public nextLayer: Layer|null = null;
  public length: number = 0;
  private neurons: Neuron[] = [];

  constructor (id: string) {
    this.id = id;
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
    this.neurons.forEach(neuron => {
      neuron.calc();
    });

    const results = this.getResults();
    if (this.nextLayer) {
      this.nextLayer.setInputs(results);
    }
  }

  public getNeurons (): Neuron[] {
    return this.neurons;
  }

  public getResults () {
    return this.neurons.map(neurons => neurons.getCalcedResult());
  }

  public getForwardLoss (targets: number[]) {
    const results = this.getResults();
    return {
      forward: MeanSquaredError(targets, results),
      primes: MeanSquaredErrorPrimes(targets, results),
    };
  }

  public getLosses () {
    return this.neurons.map((n: Neuron) => {
      return n.getWeightPrimes();
    });
  }

  public updateWeights (lossPrimes: any[], learningRate: number) {
    if (this.nextLayer) {
      // 마지막 레이어가 아니라면 전 레이어의 에러를 모두 더해야한다.
      this.neurons.forEach((neuron: Neuron, index:number) => {
        const lossPrime = lossPrimes.reduce((a: number, b: number[]) => a + b[index], 0);
        neuron.updateWeights(lossPrime, learningRate);
      });
    } else {
      // 아웃풋 레이어라면 lossPrimes 중 해당 뉴런의 인덱스 해당하는 로스만 사용해야한다.
      this.neurons.forEach((neuron: Neuron, index: number) => neuron.updateWeights(lossPrimes[index], learningRate));
    }
  }
}
