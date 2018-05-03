import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Profile from '../../components/Menu/Profile';
import Dialogs from '../../components/Menu/Dialogs';
import * as userActions from '../../actions/user';
import * as dialogActions from '../../actions/dialog';
import * as styles from './index.css';


const Menu = ({ user, userActions, dialogs, dialogActions }) => (
  user.username ? (
    <div className={styles.menu}>
      <Profile user={user} userActions={userActions} />
      <Dialogs dialogs={dialogs} dialogActions={dialogActions} />
    </div>
  ) : null
);


function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    dialogActions: bindActionCreators(dialogActions, dispatch),
  };
}


function mapStateToProps({ user, dialogs }) {
  return { user, dialogs };
}


export default connect(mapStateToProps, mapDispatchToProps)(Menu);
