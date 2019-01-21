export type NetworkOptions = {
  layerCount: number;
  nodePerLayer: number;
  targets: number[];
  learningRate: number;
  learningLimit: number;
};
export type ChartOptions = {
  height: number;
};
export type Dataset = {
  label: string;
  data: number[];
};
export type GraphNode = {
  id: string;
  name: string;
  x: number;
  y: number;
};
export type GraphLink = {
  sourceNode?: any;
  targetNode?: any;
  source: string;
  target: string;
  value: number;
};
