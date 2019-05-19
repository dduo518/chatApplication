import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './router';
import * as serviceWorker from './serviceWorker';
import 'element-theme-default';
import { Provider } from 'react-redux'
import store from './redux/store.js'

store.subscribe(() => {
  console.log(store.getState());
})

ReactDOM.render(<Provider store={store}>
  <Router />
</Provider>, document.getElementById('root'));

serviceWorker.unregister();
