
export class Layer {
  private neurons: any[];
  public length: number;

  constructor () {
    this.neurons = [];
    this.length = 0;
  }

  pushNeuron (neuron: any) {
    this.neurons.push(neuron);
    this.length = this.neurons.length;
  }
}
