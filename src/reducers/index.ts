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
};

const rootReducer = (state: AppState = initialState, action: ActionCreator): AppState => {
  switch (action.type) {
    case types.SET_LEARNING_RATE:
      return state;
    case types.SET_LEARNING_LIMIT:
      return state;
    case types.SET_NODE_PER_LAYER:
      return state;
    case types.SET_LAYER_COUNT:
      return state;
    case types.SET_NODE_GRAPHIC_DATA:
      return state;
    case types.UPDATE_ERROR_DATASET:
      return state;
    case types.UPDATE_OUTPUT_DATASET:
      return state;
    case types.SET_LEARNING_RESULT:
      return state;
    default:
      return state;
  }
};

export default rootReducer;
