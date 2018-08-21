import React from 'react';
import ReactDOM from 'react-dom';

import firebase from 'firebase/app'

import registerServiceWorker from './config/registerServiceWorker';
import config from './config/index'

import Main from './components/Main';

const configuration = config.nobre

document.title = configuration.app.title

firebase.initializeApp(configuration.firebase);

ReactDOM.render(<Main config={configuration} />, document.getElementById('root'));
registerServiceWorker();
