import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Route, Redirect } from 'react-router';
import * as userActions from '../../actions/user';
import Signin from './Signin';
import Signup from './Signup';
import * as styles from './index.css';

class Auth extends Component {
  constructor() {
    super();
    this._tabHandler = this.tabHandler.bind(this);
  }

  componentWillMount() {
    this.setState({ signup: true });
  }

  tabHandler() {
    this.setState({ signup: !this.state.signup });
  }

  render() {
    const { user } = this.props;
    const tabSignup = classnames(styles.tab, {
      [styles.tabActive]: this.state.signup,
    });
    const tabSignin = classnames(styles.tab, {
      [styles.tabActive]: !this.state.signup,
    });

    return (
      <div className={styles.home}>
        {user.login ? <Route render={() => (user.login ? <Redirect to="/" /> : null)} /> : ''}

        <button className={styles.tabs} onClick={this._tabHandler}>
          <div className={tabSignup}>Sign up</div>
          <div className={tabSignin}>Sign in</div>
        </button>
        {this.state.signup ? <Signup /> : <Signin />}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
  };
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Auth);
