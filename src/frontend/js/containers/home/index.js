import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../../actions/user';
import Signup from '../signup';

import './index.css';


const Home = props => {
  const { username } = props.user;

  return <div>{username ? 'Welcome home, Master!' : <Signup />}</div>;
};


function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
  };
}


function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
