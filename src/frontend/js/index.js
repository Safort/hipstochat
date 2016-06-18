import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { browserHistory, Router, Route, Link } from 'react-router';

import App from './containers/App';
import configureStore from './store/configureStore';

import '../styles/index.css';

const store = configureStore();

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.querySelector('.app')
);
