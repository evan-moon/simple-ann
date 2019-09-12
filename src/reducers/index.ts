import { networkOptions } from '../config';
import * as types from '../actions/actionTypes';
import { ActionCreator } from '../actions';
import { getTargets } from '../utils';

const { learningRate, learningLimit, nodePerLayer, layerCount } = networkOptions;

export interface AppState {
  nodeGraphicData: any;
  errorDataset: any;
  outputDataset: any;
  learningResult: any;
  learningRate: number;
  learningLimit: number;
  nodePerLayer: number;
  layerCount: number;
  inputs: number[];
  targets: number[];
  totalLoss: number;
};

const initialState: AppState = {
  nodeGraphicData: null,
  errorDataset: null,
  outputDataset: null,
  learningResult: null,
  learningRate,
  learningLimit,
  nodePerLayer,
  layerCount,
  inputs: [],
  targets: getTargets(nodePerLayer),
  totalLoss: -1,
};

const rootReducer = (state: AppState = initialState, action: ActionCreator): AppState => {
  switch (action.type) {
    case types.SET_LEARNING_RATE:
      return {
        ...state,
        learningRate: action.payload.rate,
      };
    case types.SET_LEARNING_LIMIT:
      return {
        ...state,
        learningLimit: action.payload.limit,
      };
    case types.SET_NODE_PER_LAYER:
      return {
        ...state,
        nodePerLayer: action.payload.count,
      };
    case types.SET_LAYER_COUNT:
      return {
        ...state,
        layerCount: action.payload.count,
      };
    case types.SET_INPUTS:
      return {
        ...state,
        inputs: action.payload.inputs,
      };
    case types.SET_NODE_GRAPHIC_DATA:
      return {
        ...state,
        nodeGraphicData: action.payload.data,
      };
    case types.SET_ERROR_DATASET:
      return {
        ...state,
        errorDataset: action.payload.data,
      };
    case types.SET_OUTPUT_DATASET:
      return {
        ...state,
        outputDataset: action.payload.data,
      };
    case types.SET_LEARNING_RESULT:
      return {
        ...state,
        learningResult: action.payload.result,
      };
    case types.SET_TOTAL_LOSS:
      return {
        ...state,
        totalLoss: action.payload.loss,
      };
    default:
      return state;
  }
};

export default rootReducer;
