import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import * as userActions from '../../actions/user';

import styles from './index.css';

class Signin extends Component {
  constructor() {
    super();
    this._onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const username = this._username.value;
    const name = this._name.value;
    const email = this._email.value;
    const password = this._password.value;
    this.props.userActions.signup({ username, name, email, password });
  }


  render() {
    const pageSignup = classnames(styles.homePage, styles.homePageActive);

    return (
      <div className={pageSignup}>
        <h3>Sign up</h3>
        <input
          ref={username => { this._username = username; }}
          placeholder="Username"
        />
        <input ref={name => { this._name = name; }} placeholder="Name" />
        <input ref={email => { this._email = email; }} placeholder="Email" />
        <input
          ref={password => { this._password = password; }}
          placeholder="Password"
        />
        <input type="button" value="Sign up" onClick={this._onSubmit} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
