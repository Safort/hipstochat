import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Menu from '../Menu';
import PageLoader from '../../components/PageLoader';
import Modal from '../../components/Modal';
import * as userActions from '../../actions/user';
import * as modalActions from '../../actions/modal';

import styles from './index.css';


class Main extends Component {
  componentDidMount() {
    this.props.userActions.loadInfo();
  }

  render() {
    const { user, contacts, modal } = this.props;
    const menu = <Menu user={user} contacts={contacts} />;
    const children = <div className={styles.detail}>{this.props.children}</div>;

    return (
      <div className={styles.main}>
        {user.username ? menu : ''}
        {user.isInfoLoaded ? children : <PageLoader />}
        <Modal {...modal} />
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    modalActions: bindActionCreators(modalActions, dispatch),
  };
}


function mapStateToProps({ user, modal }) {
  return { user, modal };
}


export default connect(mapStateToProps, mapDispatchToProps)(Main);
