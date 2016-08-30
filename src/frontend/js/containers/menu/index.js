import './index.css';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Profile from '../../components/menu/Profile.js';
import Dialogs from '../../components/menu/Dialogs.js';
import * as userActions from '../../actions/userActions';

const Menu = ({ user, userActions }) => {
  const dialogList = [
    { name: 'Some channel' },
    { name: 'UserName', address: 'Address' },
    { name: 'Athone UserName', address: 'Address2' },
  ];

  return (
    <div className="menu">
      <Profile user={user} userActions={userActions} />
      <Dialogs list={dialogList} />
    </div>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
