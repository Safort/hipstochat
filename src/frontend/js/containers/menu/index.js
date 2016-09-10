import './index.css';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Profile from '../../components/menu/Profile.js';
import Dialogs from '../../components/menu/Dialogs.js';
import * as userActions from '../../actions/userActions';


const Menu = ({ user, userActions, dialogs }) => {
  return (
    <div className="menu">
      <Profile user={user} userActions={userActions} />
      <Dialogs list={dialogs.list} />
    </div>
  );
};


function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
  };
}


function mapStateToProps({ user, dialogs }) {
  return { user, dialogs };
}


export default connect(mapStateToProps, mapDispatchToProps)(Menu);
