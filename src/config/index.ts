type NetworkOption = {
  layerCount: number;
  nodePerLayer: number;
  targets: number[];
  learningRate: number;
  learningLimit: number;
};

export const networkOption: NetworkOption = {
  layerCount: 2,
  nodePerLayer: 2,
  targets: [0.2, 0.7],
  learningRate: 0.3,
  learningLimit: 2000,
};
