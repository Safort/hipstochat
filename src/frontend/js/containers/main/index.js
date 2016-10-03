import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Menu from '../menu';
import PageLoader from '../../components/pageLoader';
import Modal from '../../components/modal';
import * as userActions from '../../actions/userActions';
import * as modalActions from '../../actions/modalActions';

import './index.css';


class Main extends Component {
  componentDidMount() {
    this.props.userActions.loadInfo();
  }


  render() {
    const { user, contacts, modal } = this.props;
    const menu = <Menu user={user} contacts={contacts} />;
    const children = <div className="detail">{this.props.children}</div>;

    return (
      <div className="main">
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
