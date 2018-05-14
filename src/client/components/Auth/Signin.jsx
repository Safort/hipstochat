import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router';
import classnames from 'classnames';
import * as userActions from '../../actions/user';
import * as styles from './index.css';


class Signin extends React.PureComponent {
  constructor() {
    super();
    this._onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    const login = this._login.value;
    const password = this._password.value;
    this.props.userActions.signin({ login, password });
  }

  renderFrom() {
    const pageSignin = classnames(styles.homePage, styles.homePageActive);
  
    return (
      <form
        className={pageSignin}
        action="http://localhost:8080/signin"
        method="post"
      >
        <h3>Sign in</h3>
        <input
          ref={login => { this._login = login; }}
          placeholder="login"
        />
        <input
          ref={password => { this._password = password; }}
          placeholder="Password"
        />
        <input type="submit" value="Sign in" onClick={this._onSubmit} />
      </form>
    );
  }

  render() {
    return <Route
      render={props =>
        !this.props.user.login ? (
          this.renderFrom()
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location }
            }}
          />
        )
      }
    />
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
