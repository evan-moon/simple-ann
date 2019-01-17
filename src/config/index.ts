type NetworkOption = {
  layerCount: number;
  nodePerLayer: number;
  targets: number[];
  learningRate: number;
  learningLimit: number;
};

export const networkOption: NetworkOption = {
  layerCount: 3,
  nodePerLayer: 1,
  targets: [0.2],
  learningRate: 0.3,
  learningLimit: 2000,
};
