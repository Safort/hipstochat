import React, { Component } from 'react';
import { Link } from 'react-router';
import Avatar from '../avatar';


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
      <div className="menu-profile">
        <Avatar username={username} />
        <div className="menu-profile__username">
          <Link to={"/profile/edit"}>{username}</Link>
        </div>
        <div className="menu-profile__config">
          <div title="Exit" onClick={this._signout}>[Exit]</div>
        </div>
      </div>
    );
  }
}
