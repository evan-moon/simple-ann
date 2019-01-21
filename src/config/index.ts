import { NetworkOptions, ChartOptions } from 'types';

export const networkOptions: NetworkOptions = {
  layerCount: 5,
  nodePerLayer: 3,
  targets: [0.5, 0.3, 0.9],
  learningRate: 0.1,
  learningLimit: 1000,
};

export const chartOptions: ChartOptions = {
  width: 400,
  height: 400,
};
