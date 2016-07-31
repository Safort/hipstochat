import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as searchActions from '../../actions/searchActions';


const User = ({username}) => (
  <div className="search__user">{username}</div>
);

class Search extends Component {
  render() {
    const userList = this.props.search.userList.map(({ username }, i) => (
      <User key={i} username={username} />
    ));

    return (
      <div className="search">
        <header className="search__header">
          <input placeholder="username or channel name" />
        </header>
        <div className="search__users">
          {userList}
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    searchActions: bindActionCreators(searchActions, dispatch),
  };
}

function mapStateToProps(state) {
  return {
    search: state.search,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
