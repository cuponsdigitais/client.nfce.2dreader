import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

import registerServiceWorker from './config/registerServiceWorker';
import './assets/styles.css';
import config from './config/index'

import Main from './components/Main';

document.title = config.company.name

firebase.initializeApp(config.firebase);

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
