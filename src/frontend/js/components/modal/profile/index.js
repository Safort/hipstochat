import React, { Component } from 'react';
import './index.css';


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
      <div className="modal-profile">
        <div className="modal-profile__title">Contact info</div>
        <div className="modal-profile__info">
          username: {user.username}
        </div>
        <div className="modal-profile__info">
          <button onClick={this._onClick}>Добавить</button>
        </div>
      </div>
    );
  }
}


export default Profile;
