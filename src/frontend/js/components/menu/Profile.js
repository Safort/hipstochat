import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Profile extends Component {
  constructor() {
    super();
    this._logout = this.logout.bind(this);
  }

  logout() {
    this.props.userActions.logout();
  }

  render() {
    const { username } = this.props.user;

    return (
      <div className="menu-profile">
        <div className="menu-profile__img">
          <img src="" alt="" />
        </div>
        <div className="menu-profile__username">
          <Link to={"/profile/edit"}>{username}</Link>
        </div>
        <div className="menu-profile__config">
          <div title="Exit" onClick={this._logout}>[Exit]</div>
        </div>
      </div>
    );
  }
}
