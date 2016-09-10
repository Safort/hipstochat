import './index.css';

import React, { Component } from 'react';


class Profile extends Component {
  constructor() {
    super();

    this._onClick = this.onClick.bind(this);
  }


  onClick() {
    const { user, dialogsActions } = this.props;

    dialogsActions.create({
      dialogUserId: user._id,
      dialogName: user.username,
    });
  }


  render() {
    const { user } = this.props;

    return (
      <div className="modal-profile">
        <div className="modal-profile__title">
          Contact info
        </div>
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
