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

export const updateErrorDataset = (data: any): ActionCreator => {
  return {
    type: types.UPDATE_ERROR_DATASET,
    payload: { data },
  };
};

export const updateOutputDataset = (data: any): ActionCreator => {
  return {
    type: types.UPDATE_OUTPUT_DATASET,
    payload: { data },
  };
};

export const setLearningResult = (): ActionCreator => {
  return {
    type: types.SET_LEARNING_RESULT,
    payload: {},
  };
};