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
export type DataValue = {
  count: number;
  value: number;
};
export type Labels = {
  x: string;
  y: string;
};
export type Dataset = {
  label: Labels;
  values: DataValue[];
};
