import React, { Component } from 'react';
import styles from './index.css';


class Profile extends Component {
  constructor() {
    super();

    this._onClick = this.onClick.bind(this);
  }

  onClick() {
    const { user, contactActions } = this.props;

    contactActions.create({
      interlocutorId: user._id,
      name: user.login,
    });
  }

  render() {
    const { user } = this.props;

    return (
      <div>
        <div className={styles.title}>Contact info</div>
        <div className={styles.info}>
          login: {user.login}
        </div>
        <div className={styles.info}>
          <button onClick={this._onClick}>Добавить</button>
        </div>
      </div>
    );
  }
}


export default Profile;
