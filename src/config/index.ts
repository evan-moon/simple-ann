type NetworkOption = {
  layerCount: number;
  nodePerLayer: number;
  targets: number[];
  learningRate: number;
  learningLimit: number;
};

export const networkOption: NetworkOption = {
  layerCount: 3,
  nodePerLayer: 2,
  targets: [0.2, 0.8],
  learningRate: 0.3,
  learningLimit: 10,
};
