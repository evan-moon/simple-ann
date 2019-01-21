export type NetworkOptions = {
  layerCount: number;
  nodePerLayer: number;
  targets: number[];
  learningRate: number;
  learningLimit: number;
};
export type ChartOptions = {
  width: number;
  height: number;
};
export type Dataset = {
  label: string;
  data: number[];
};
