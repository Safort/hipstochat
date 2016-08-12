import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as searchActions from '../../actions/searchActions';

class User extends Component {
  constructor(props) {
    super(props);

    this._onClick = this.onClick.bind(this);
  }

  onClick() {
    // console.log(this.props);
  }

  render() {
    return (
      <div onClick={this._onClick} className="search__user">
        {this.props.username}
      </div>
    );
  }
}

class Search extends Component {
  constructor(props) {
    super(props);

    this._search = this.search.bind(this);
  }


  search() {
    const username = this.refs.username.value;

    this.props.searchActions.searchUser({ username });
  }


  render() {
    const userList = this.props.search.userList.map(({ username }, i) => (
      <User key={i} dispatch={this.props.dispatch} username={username} />
    ));

    return (
      <div className="search">
        <header className="search__header">
          <input
            className="search__input"
            ref="username"
            placeholder="username or channel name"
            onKeyUp={this._search}
          />
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
