import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import './styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import bootstrapper from './lib/bootstrapper';

import App from './App';
import * as serviceWorker from './serviceWorker';

const state = store.getState();
const { targets, layerCount, nodePerLayer, learningRate, learningLimit } = state;
bootstrapper({ targets, layerCount, nodePerLayer, learningRate, learningLimit });

ReactDOM.render((
  <Provider store={ store }>
    <App></App>
  </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
