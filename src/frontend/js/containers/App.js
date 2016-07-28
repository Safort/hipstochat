import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory, Router } from 'react-router';

import Main from './main';
import Signup from './signup';
import Home from './home';
import Pm from './pm';
import Profile from './profile';
import NoMatch from '../components/no-match.js';

import * as userActions from '../actions/userActions';
import '../../styles/index.css';

const routeConfig = {
  path: '/',
  component: Main,
  indexRoute: { component: Home },
  childRoutes: [
    { path: '/signup', component: Signup },
    { path: '/profile/edit', component: Profile },
    { path: '/pm/:usename', component: Pm },
    { path: '*', component: NoMatch },
  ],
};

const App = () => <Router history={browserHistory} routes={routeConfig} />;

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
  };
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
