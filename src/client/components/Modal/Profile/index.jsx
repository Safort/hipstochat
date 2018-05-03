import React, { Component } from 'react';
import styles from './index.css';


class Profile extends Component {
  constructor() {
    super();

    this._onClick = this.onClick.bind(this);
  }

  onClick() {
    const { user, dialogActions } = this.props;

    dialogActions.create({
      interlocutorId: user._id,
      name: user.username,
    });
  }

  render() {
    const { user } = this.props;

    return (
      <div>
        <div className={styles.title}>Contact info</div>
        <div className={styles.info}>
          username: {user.username}
        </div>
        <div className={styles.info}>
          <button onClick={this._onClick}>Добавить</button>
        </div>
      </div>
    );
  }
}


export default Profile;
