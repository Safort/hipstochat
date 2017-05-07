import React, { Component } from 'react';
import Avatar from '../../components/Avatar';

import styles from './index.css';


class User extends Component {
  constructor(props) {
    super(props);

    this._onClick = this.onClick.bind(this);
  }


  onClick() {
    this.props.modalActions.show('profile', this.props.data);
  }


  render() {
    const username = this.props.data.username;

    /* eslint jsx-a11y/no-static-element-interactions: 0 */
    return (
      <div onClick={this._onClick} className={styles.searchUser}>
        <Avatar username={username} />
        <div className={styles.searchUsername}>{username}</div>
      </div>
    );
  }
}


export default User;
