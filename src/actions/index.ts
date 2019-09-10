import * as types from './actionTypes';
import { networkOptions } from '../config';

const { learningRate, learningLimit, nodePerLayer, layerCount } = networkOptions;

export const setLearningRate = (rate: number = learningRate) => {
  return {
    type: types.SET_LEARNING_RATE,
    rate,
  };
};

export const setLearningLimit = (limit: number = learningLimit) => {
  return {
    type: types.SET_LEARNING_LIMIT,
    limit,
  };
};

export const setNodePerLayer = (count: number = nodePerLayer) => {
  return {
    type: types.SET_NODE_PER_LAYER,
    count,
  };
};

export const setLayerCount = (count: number = layerCount) => {
  return {
    type: types.SET_LAYER_COUNT,
    count,
  };
};

export const setNodeGraphicData = (data: { nodes: any[], links: any[] }) => {
  return {
    type: types.SET_NODE_GRAPHIC_DATA,
    data,
  };
};

export const updateErrorDataset = () => {
  return {
    type: types.UPDATE_ERROR_DATASET,
  };
};

export const updateOutputDataset = () => {
  return {
    type: types.UPDATE_OUTPUT_DATASET,
  };
};

export const setLearningResult = () => {
  return {
    type: types.SET_LEARNING_RATE,
  };
};