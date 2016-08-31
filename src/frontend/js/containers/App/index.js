import './index.css';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import routers from '../../routers';
import * as userActions from '../../actions/userActions';


const App = () => (
  <Router history={browserHistory} routes={routers} />
);

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
