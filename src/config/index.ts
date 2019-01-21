import { NetworkOptions, ChartOptions } from 'types';

export const networkOptions: NetworkOptions = {
  layerCount: 5,
  nodePerLayer: 3,
  targets: [0.5, 0.3, 1],
  learningRate: 0.2,
  learningLimit: 500,
};

export const chartOptions: ChartOptions = {
  width: 300,
  height: 300,
};
