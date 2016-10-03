import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../../actions/userActions';


class Signup extends Component {
  constructor() {
    super();
    this._tabHandler = this.tabHandler.bind(this);
    this._signupUser = this.signupUser.bind(this);
    this._signinUser = this.signinUser.bind(this);
  }


  componentWillMount() {
    this.setState({ signup: 'inactive', signin: 'active' });
  }


  signupUser() {
    const username = this._username.value;
    const name = this._name.value;
    const email = this._email.value;
    const password = this._password.value;
    this.props.userActions.signup({ username, name, email, password });
  }


  signinUser(event) {
    event.preventDefault();

    const username = this._signinUsername.value;
    const password = this._signinPassword.value;
    this.props.userActions.signin({ username, password });
  }


  tabHandler() {
    if (this.state.signup === 'active') {
      this.setState({ signup: 'inactive', signin: 'active' });
    } else {
      this.setState({ signup: 'active', signin: 'inactive' });
    }
  }


  render() {
    const tabSignup = `home__tab home__tab--${this.state.signup}`;
    const tabSignin = `home__tab home__tab--${this.state.signin}`;
    const pageSignup = `signup home__page home__page--${this.state.signup}`;
    const pageSignin = `signin home__page home__page--${this.state.signin}`;

    return (
      <div className="home">
        <button className="home__tabs" onClick={this._tabHandler}>
          <div className={tabSignup}>Sign up</div>
          <div className={tabSignin}>Sign in</div>
        </button>
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
          <input type="button" value="Sign up" onClick={this._signupUser} />
        </div>
        <form
          className={pageSignin}
          action="http://localhost:8080/signin"
          method="post"
        >
          <h3>Sign in</h3>
          <input
            ref={signinUsername => { this._signinUsername = signinUsername; }}
            placeholder="Username"
          />
          <input
            ref={signinPassword => { this._signinPassword = signinPassword; }}
            placeholder="Password"
          />
          <input type="submit" value="Sign in" onClick={this._signinUser} />
        </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
