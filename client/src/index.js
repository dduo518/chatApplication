import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './router';
import * as serviceWorker from './serviceWorker';
import 'element-theme-default';

ReactDOM.render(<Router />, document.getElementById('root'));

serviceWorker.unregister();
