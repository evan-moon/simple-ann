import { Neuron } from 'lib/neuron';
import { Layer } from 'lib/layer';

export class Network {
  private layers: Layer[];
  private firstLayer: Layer;
  private lastLayer: Layer;
  private targets: number[];
  private inputs: number[];
  private totalLoss: number;
  private totalLossPrimes: number[];
  private output: number[];
  private learningRate: number;

  private nodes: any[] = [];
  private links: any[] = [];

  constructor (targets: number[], inputs: number[]) {
    if (targets.length !== inputs.length) {
      throw new Error('targets must have same length with inputs');
    }
    this.targets = targets;
    this.inputs = inputs;

    this.layers = [];
    this.totalLoss = -1;
    this.totalLossPrimes = [];
    this.output = [];
  }

  setLearningRate (learningRate: number) {
    this.learningRate = learningRate;
  }

  createNodes (layerCount: number, nodePerLayer: number) {
    for (let i = 0; i < layerCount; i++) {
      const layer: Layer = new Layer(`layer-${i}`);
      for (let j = 0; j < nodePerLayer; j++) {
        const newWeights = [];
        for (let k = 0; k < this.inputs.length; k++) {
          newWeights.push(Math.random());
        }

        const neuronId = `neuron-[${i}][${j}]`;
        const neuron = new Neuron(neuronId, newWeights);
        layer.pushNeuron(neuron);
      }

      if (i === 0) {
        this.firstLayer = layer;
        this.firstLayer.setInputs(this.inputs);
      }
      if (i === layerCount - 1) {
        this.lastLayer = layer;
      }

      this.layers.push(layer);
    }

    this.layers.forEach((layer, layerIndex) => {
      const prevLayer = this.layers[layerIndex - 1];
      const nextLayer = this.layers[layerIndex + 1];
      if (prevLayer) {
        layer.setPrevLayer(prevLayer);
      }
      if (nextLayer) {
        layer.setNextLayer(nextLayer);
      }
    });

    // Create Nodes and Links
    // @TODO 시간복잡도 n^3이므로 개선해야함
    this.layers.forEach((l: Layer, li: number) => {
      l.getNeurons().forEach((n: Neuron, ni: number) => {
        this.nodes.push({ id: n.id, name: `[${li}][${ni}]`, x: li, y: ni });
        if (l.nextLayer) {
          l.nextLayer.getNeurons().forEach((nn: Neuron) => {
            this.links.push({ source: n.id, target: nn.id, value: 1 });
          });
        }
      });
    });
  }

  getNetworkGraphicData () {
    return {
      nodes: this.nodes,
      links: this.links,
    };
  }

  forwardPropagation () {
    this.layers.forEach((layer: Layer) => {
      layer.calc();
    });
    const loss = this.lastLayer.getForwardLoss(this.targets);
    this.output = this.lastLayer.getResults();
    this.totalLoss = loss.forward;
    this.totalLossPrimes = loss.primes;
  }

  backPropagation () {
    const reversed = [...this.layers].reverse();
    const learningRate = this.learningRate;
    reversed.forEach(layer => {
      if (layer.id === this.lastLayer.id) {
        layer.updateWeights(this.totalLossPrimes, learningRate);
      } else {
        // 순서가 거꾸로 되어있으니까 nextLayer가 계산이 먼저 끝나있다.
        const losses = layer.nextLayer.getLosses();
        layer.updateWeights(losses, learningRate);
      }
    });
  }

  getResults () {
    return this.lastLayer.getResults();
  }

  getError () {
    return this.totalLoss;
  }
}
