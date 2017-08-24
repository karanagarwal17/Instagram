import React from "react";
import { render } from "react-dom";
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import jwt from 'jsonwebtoken';
import routes from './routes/index';
import style from './scss/style.scss';
import rootReducers from './reducers/index';
import { setCurrentUser } from './actions/signin';

let store = createStore(
  rootReducers,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

render(
  <Provider store={store}>
    <Router history={ browserHistory } routes={ routes } />
  </Provider>, document.getElementById("root")
);
