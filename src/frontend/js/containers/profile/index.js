import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../../actions/userActions';


class Profile extends Component {
  constructor() {
    super();

    this._save = this.save.bind(this);
  }


  save() {
    const username = this._username.value;
    const name = this._name.value;
    const email = this._email.value;

    this.props.userActions.update({ username, name, email });
  }


  render() {
    const user = this.props.user;

    return (
      <div className="profile-edit">
        <div className="profile">
          <input
            ref={username => { this._username = username; }}
            placeholder="username"
            defaultValue={user.username}
          />
          <br />
          <input
            ref={name => { this._name = name; }}
            placeholder="name"
            defaultValue={user.name}
          />
          <br />
          <input
            ref={email => { this._email = email; }}
            placeholder="email"
            defaultValue={user.email}
          />
          <br />
          <input type="button" onClick={this._save} value="Save" />
        </div>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
  };
}


function mapStateToProps({ user }) {
  return { user };
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
