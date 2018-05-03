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
    this.setState({ signup: false, signin: true });
  }

  tabHandler() {
    if (this.state.signup === true) {
      this.setState({ signup: false, signin: true });
    } else {
      this.setState({ signup: true, signin: false });
    }
  }

  render() {
    const { user } = this.props;
    const tabSignup = classnames({
      [styles.tab]: true,
      [styles.tabActive]: this.state.signup,
    });
    const tabSignin = classnames({
      [styles.tab]: true,
      [styles.tabActive]: this.state.signin,
    });

    return (
      <div className={styles.home}>

        {
          user.username ? <Route
            render={() => (user.username ? <Redirect to="/" /> : null)}
          /> : ''
        }

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

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
