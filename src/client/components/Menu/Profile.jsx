import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar';
import styles from './Profile.css';


export default class Profile extends React.PureComponent {
  constructor() {
    super();
    this._signout = this.signout.bind(this);
  }

  signout() {
    this.props.userActions.signout();
  }

  render() {
    const { login } = this.props.user;

    return (
      <div className={styles.profile}>
        <Avatar login={login} />
        <div className={styles.login}>
          <Link to={'/profile/edit'}>{login}</Link>
        </div>
        <div className={styles.config}>
          <button title="Exit" onClick={this._signout}>[Exit]</button>
        </div>
      </div>
    );
  }
}
