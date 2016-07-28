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
    const refs = this.refs;

    const username = refs.username.value;
    const name = refs.name.value;
    const email = refs.email.value;

    this.props.userActions.update({ username, name, email });
  }

  render() {
    console.log('-----', this.props.user);
    const user = this.props.user;
    return (
      <div className="profile-edit">
        <div className="profile">
          <input
            ref="username" placeholder="username" defaultValue={user.username}
          />
          <br />
          <input ref="name" placeholder="name" defaultValue={user.name} />
          <br />
          <input ref="email" placeholder="email" defaultValue={user.email} />
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

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
