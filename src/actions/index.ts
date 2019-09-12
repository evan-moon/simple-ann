import * as types from './actionTypes';
import { networkOptions } from '../config';

const { learningRate, learningLimit, nodePerLayer, layerCount } = networkOptions;

export interface ActionCreator {
  type: string;
  payload: any;
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

export const setInputs = (inputs: number[]): ActionCreator => {
  return {
    type: types.SET_INPUTS,
    payload: { inputs },
  };
};

export const setNodeGraphicData = (data: { nodes: any[], links: any[] }): ActionCreator => {
  return {
    type: types.SET_NODE_GRAPHIC_DATA,
    payload: { data },
  };
};

export const destroyNodeGraphicData = (): ActionCreator => {
  return {
    type: types.DESTROY_NODE_GRAPHIC_DATA,
    payload: {},
  };
}

export const setErrorDataset = (data: any): ActionCreator => {
  return {
    type: types.SET_ERROR_DATASET,
    payload: { data },
  };
};

export const destroyErrorDataset = (): ActionCreator => {
  return {
    type: types.DESTROY_ERROR_DATASET,
    payload: {},
  };
}

export const setOutputDataset = (data: any): ActionCreator => {
  return {
    type: types.SET_OUTPUT_DATASET,
    payload: { data },
  };
};

export const destroyOutputDataset = (): ActionCreator => {
  return {
    type: types.DESTROY_OUTPUT_DATASET,
    payload: {},
  };
};

export const setLearningResult = (result: any): ActionCreator => {
  return {
    type: types.SET_LEARNING_RESULT,
    payload: { result },
  };
};

export const destroyLearningResult = (): ActionCreator => {
  return {
    type: types.DESTROY_LEARNING_RESULT,
    payload: {},
  };
};

export const setTotalLoss = (loss: number): ActionCreator => {
  return {
    type: types.SET_TOTAL_LOSS,
    payload: { loss },
  };
};

export const destroyTotalLoss = (): ActionCreator => {
  return {
    type: types.DESTROY_TOTAL_LOSS,
    payload: {},
  };
};