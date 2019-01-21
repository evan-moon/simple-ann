import { NetworkOptions, ChartOptions } from 'types';

export const networkOptions: NetworkOptions = {
  layerCount: 5,
  nodePerLayer: 2,
  targets: [0.01, 0.8],
  learningRate: 0.3,
  learningLimit: 1000,
};

export const chartOptions: ChartOptions = {
  width: 400,
  height: 400,
};
