import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase'

import registerServiceWorker from './config/registerServiceWorker';
import config from './config/index'

import Main from './components/Main';

document.title = config.app.title

firebase.initializeApp(config.firebase);

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
