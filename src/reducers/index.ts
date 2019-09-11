import { networkOptions } from '../config';
import * as types from '../actions/actionTypes';
import { ActionCreator } from '../actions';

const { learningRate, learningLimit, nodePerLayer, layerCount } = networkOptions;

interface AppState {
  nodeGraphicData: any;
  errorDataset: any;
  outputDataset: any;
  learningResult: any;
  learningRate: number;
  learningLimit: number;
  nodePerLayer: number;
  layerCount: number;
  targets: number[];
};

function getTargets (nodePerLayer: number): number[] {
  const targets: number[] = [];
  const min = 0.1;
  const max = 1;
  for (let i = 0; i < nodePerLayer; i++) {
    targets.push(Math.random() * (max - min) + min);
  }
  return targets;
}

const initialState: AppState = {
  nodeGraphicData: null,
  errorDataset: null,
  outputDataset: null,
  learningResult: null,
  learningRate,
  learningLimit,
  nodePerLayer,
  layerCount,
  targets: getTargets(nodePerLayer),
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
    case types.SET_NODE_GRAPHIC_DATA:
      return {
        ...state,
        nodeGraphicData: action.payload.data,
      };
    case types.UPDATE_ERROR_DATASET:
      return {
        ...state,
        errorDataset: action.payload.data,
      };
    case types.UPDATE_OUTPUT_DATASET:
      return {
        ...state,
        outputDataset: action.payload.data,
      };
    case types.SET_LEARNING_RESULT:
      return {
        ...state,
        learningResult: action.payload.data,
      };
    default:
      return state;
  }
};

export default rootReducer;
