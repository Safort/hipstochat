import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../../actions/userActions';
import Menu from '../menu';
import PageLoader from '../PageLoader';

class Main extends Component {
  componentDidMount() {
    this.props.userActions.loadInfo();
  }

  render() {
    let { user, contacts } = this.props;
    const menu = <Menu user={user} contacts={contacts} />;
    const children = <div className="detail">{this.props.children}</div>;

    return (
      <div className="main">
        {user.username ? menu : ''}
        {user.isInfoLoaded ? children : <PageLoader />}
      </div>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
