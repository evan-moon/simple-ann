import * as types from './actionTypes';
import { networkOptions } from '../config';

const { learningRate, learningLimit, nodePerLayer, layerCount } = networkOptions;

export interface ActionCreator {
  type: string;
  payload?: Object;
  error?: boolean;
};

export const setLearningRate = (rate: number = learningRate): ActionCreator => {
  return {
    type: types.SET_LEARNING_RATE,
    payload: { rate },
  };
};

export const setLearningLimit = (limit: number = learningLimit): ActionCreator => {
  return {
    type: types.SET_LEARNING_LIMIT,
    payload: { limit },
  };
};

export const setNodePerLayer = (count: number = nodePerLayer): ActionCreator => {
  return {
    type: types.SET_NODE_PER_LAYER,
    payload: { count },
  };
};

export const setLayerCount = (count: number = layerCount): ActionCreator => {
  return {
    type: types.SET_LAYER_COUNT,
    payload: { count },
  };
};

export const setNodeGraphicData = (data: { nodes: any[], links: any[] }): ActionCreator => {
  return {
    type: types.SET_NODE_GRAPHIC_DATA,
    payload: { data },
  };
};

export const updateErrorDataset = (): ActionCreator => {
  return {
    type: types.UPDATE_ERROR_DATASET,
  };
};

export const updateOutputDataset = (): ActionCreator => {
  return {
    type: types.UPDATE_OUTPUT_DATASET,
  };
};

export const setLearningResult = (): ActionCreator => {
  return {
    type: types.SET_LEARNING_RESULT,
  };
};