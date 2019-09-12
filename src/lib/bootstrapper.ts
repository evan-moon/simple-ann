import store from '../store';
import {
  setInputs,
  setNodeGraphicData,
  destroyNodeGraphicData,
  setErrorDataset,
  destroyErrorDataset,
  setOutputDataset,
  destroyOutputDataset,
  setLearningResult,
  destroyLearningResult,
  setTotalLoss,
  destroyTotalLoss
} from '../actions';
import { Network } from './network';


interface BootstrapProps {
  targets: number[];
  layerCount: number;
  nodePerLayer: number;
  learningRate: number;
  learningLimit: number;
};

const bootstrapper = ({ targets, layerCount, nodePerLayer, learningRate, learningLimit }: BootstrapProps) => {
  store.dispatch(destroyNodeGraphicData());
  store.dispatch(destroyErrorDataset());
  store.dispatch(destroyOutputDataset());
  store.dispatch(destroyLearningResult());
  store.dispatch(destroyTotalLoss());

  const inputs = targets.map(target => Math.random() + target);
  store.dispatch(setInputs(inputs));

  const network = new Network(targets, inputs);
  network.createNodes(layerCount, nodePerLayer);
  network.setLearningRate(learningRate);

  const networkDataset = network.getNetworkGraphicData();
  store.dispatch(setNodeGraphicData(networkDataset));

  const errorDataset: number[] = [];
  const outputDataset: number[][] = targets.map(() => {
    return [];
  });

  for (let i = 0; i < learningLimit; i++) {
    network.forwardPropagation();
    network.backPropagation();
  
    errorDataset.push(network.getTotalLoss());
    network.getResults().forEach((output: number, index: number) => {
      outputDataset[index].push(output);
    });
  }

  store.dispatch(setErrorDataset(errorDataset));
  store.dispatch(setOutputDataset(outputDataset));
  store.dispatch(setLearningResult(network.getResults()));
  store.dispatch(setTotalLoss(network.getTotalLoss()));
};

export default bootstrapper;