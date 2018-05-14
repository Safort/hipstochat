import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import * as userActions from '../../actions/user';
import * as styles from './index.css';


class Signin extends Component {
  constructor() {
    super();
    this._onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const login = this._login.value;
    const name = this._name.value;
    const password = this._password.value;

    this.props.userActions.signup({ login, name, password });
  }

  render() {
    const pageSignup = classnames(styles.homePage, styles.homePageActive);

    return (
      <div className={pageSignup}>
        <h3>Sign up</h3>
        <input
          defaultValue="al"
          ref={login => { this._login = login; }}
          placeholder="login"
        />
        <input 
          defaultValue="al" 
          ref={name => { this._name = name; }} placeholder="Name"
        />
        <input
          defaultValue="al"
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
