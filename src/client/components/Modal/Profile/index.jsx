import React from 'react';
import styles from './index.css';

class Profile extends React.PureComponent {
  constructor() {
    super();

    this._onClick = this.onClick.bind(this);
  }

  onClick() {
    const { user, contactActions } = this.props;

    contactActions.add(user.id, user.name);
  }

  render() {
    const { user } = this.props;

    return (
      <div>
        <div className={styles.title}>Contact info</div>
        <div className={styles.info}>
          login: {user.login}
          <br />
          name: {user.name}
          <br />
        </div>
        <div className={styles.info}>
          <button onClick={this._onClick}>Добавить</button>
        </div>
      </div>
    );
  }
}

export default Profile;
