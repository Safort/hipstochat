import React, { Component } from 'react';

export default class Profile extends Component {
  render() {
    return (
      <div className="profile-edit">
        <div className="profile">
          <input ref="userName" />
          <br />
          <input defaultValue={"email"} />
          <br />
          <input defaultValue={"pass"} />
          <br />
          <input defaultValue={"avatarUrl"} />
          <br />
          <input type="button" value="Save" />
        </div>
      </div>
    );
  }
}
