import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../../actions/userActions';


let users = [
  { username: 'Username' },
  { username: 'Username2' },
  { username: 'Username3' },
  { username: 'Username4' },
];

const User = ({username}) => (
  <div className="search__user">{username}</div>
);


class Search extends Component {

  render() {
    const userList = users.map(({ username }) => (
      <User username={username} />
    ));

    return (
      <div className="search">
        <header className="search__header">
          <input placeholder="username or channel name" />
        </header>

        {userList}
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

export default connect(mapStateToProps, mapDispatchToProps)(Search);
