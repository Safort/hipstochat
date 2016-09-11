import './index.css';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Profile from '../../components/menu/profile.js';
import Dialogs from '../../components/menu/dialogs.js';
import * as userActions from '../../actions/userActions';
import * as dialogsActions from '../../actions/dialogsActions';


class Menu extends Component {
  constructor() {
    super();
  }


  render() {
    const { user, userActions, dialogs, dialogsActions } = this.props;

    return (
      <div className="menu">
        <Profile user={user} userActions={userActions} />
        <Dialogs list={dialogs.list} dialogsActions={dialogsActions} />
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    dialogsActions: bindActionCreators(dialogsActions, dispatch),
  };
}


function mapStateToProps({ user, dialogs }) {
  return { user, dialogs };
}


export default connect(mapStateToProps, mapDispatchToProps)(Menu);
