import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../../actions/userActions';

class Profile extends Component {



  render() {
    console.log('-----', this.props.user);
    const user = this.props.user;
    return (
      <div className="profile-edit">
        <div className="profile">
          <input ref="user" placeholder="name"  defaultValue={user.name} />
          <br />
          <input ref="userName" placeholder="userName" defaultValue={user.username} />
          <br />
          <input ref="email" placeholder="email" defaultValue={user.email} />
          <br />
          <input type="button" value="Save" />
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
