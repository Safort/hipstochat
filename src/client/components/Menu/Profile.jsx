import React, { Component } from 'react';
import { Link } from 'react-router';
import Avatar from '../Avatar';
import styles from './Profile.css';


export default class Profile extends Component {
  constructor() {
    super();
    this._signout = this.signout.bind(this);
  }

  signout() {
    this.props.userActions.signout();
  }

  render() {
    const { username } = this.props.user;

    return (
      <div className={styles.menuProfile}>
        <Avatar username={username} />
        <div className={styles.menuProfileUsername}>
          <Link to={'/profile/edit'}>{username}</Link>
        </div>
        <div className={styles.menuProfileConfig}>
          <button title="Exit" onClick={this._signout}>[Exit]</button>
        </div>
      </div>
    );
  }
}
