import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import * as userActions from '../../actions/user';
import * as styles from './index.css';


class Signup extends Component {
  constructor() {
    super();
    this._onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    const username = this._username.value;
    const password = this._password.value;
    this.props.userActions.signin({ username, password });
  }

  render() {
    const pageSignin = classnames(styles.homePage, styles.homePageActive);

    return (
      <form
        className={pageSignin}
        action="http://localhost:8080/signin"
        method="post"
      >
        <h3>Sign in</h3>
        <input
          ref={username => { this._username = username; }}
          placeholder="Username"
        />
        <input
          ref={password => { this._password = password; }}
          placeholder="Password"
        />
        <input type="submit" value="Sign in" onClick={this._onSubmit} />
      </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
