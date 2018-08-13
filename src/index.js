import React from 'react';
import ReactDOM from 'react-dom';

import firebase from 'firebase/app'

import registerServiceWorker from './config/registerServiceWorker';
import config from './config/index'

import Main from './components/Main';

document.title = config.atacarejo3irmaos.app.title

firebase.initializeApp(config.atacarejo3irmaos.firebase);

ReactDOM.render(<Main config={config.atacarejo3irmaos} />, document.getElementById('root'));
registerServiceWorker();
