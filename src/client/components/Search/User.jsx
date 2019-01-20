import React, { Component } from 'react';
import Avatar from '../../components/Avatar';
import * as styles from './index.css';

class User extends Component {
  constructor(props) {
    super(props);

    this._onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.modalActions.show('profile', this.props.data);
  }

  render() {
    const login = this.props.data.login;

    /* eslint jsx-a11y/no-static-element-interactions: 0 */
    return (
      <div onClick={this._onClick} className={styles.user}>
        <Avatar login={login} />
        <div className={styles.login}>{login}</div>
      </div>
    );
  }
}

export default User;
