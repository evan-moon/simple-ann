import React from 'react';
import ReactDOM from 'react-dom';

import './normalize.css';
import './index.css';
import 'c3/c3.css';

import App from './App';
import * as serviceWorker from './serviceWorker';

import { init } from './init';

ReactDOM.render(<App />, document.getElementById('root'));

init();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
