type NetworkOption = {
  layerCount: number;
  nodePerLayer: number;
  targets: number[];
  learningRate: number;
  learningLimit: number;
};

export const networkOption: NetworkOption = {
  layerCount: 2,
  nodePerLayer: 3,
  targets: [0.2, 0.8, 0.5],
  learningRate: 0.3,
  learningLimit: 1000,
};
