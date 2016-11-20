import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as searchActions from '../../actions/search';
import * as modalActions from '../../actions/modal';
import User from './user';

import './index.css';


class Search extends Component {
  constructor(props) {
    super(props);

    this._find = this.find.bind(this);
  }


  componentWillMount() {
    this.props.searchActions.clear();
  }


  // TODO: add debouncer
  find() {
    const username = this._username.value.trim();

    if (username.length >= 2) {
      this.props.searchActions.findUser({ username });
    }
  }


  render() {
    const userList = this.props.search.userList.map((user, i) => (
      <User
        key={i}
        modalActions={this.props.modalActions}
        data={user}
      />
    ));

    return (
      <div className="search">
        <header className="search__header">
          <input
            className="search__input"
            ref={username => { this._username = username; }}
            placeholder="username or channel name"
            onKeyUp={this._find}
          />
        </header>
        <div className="search__users">{userList}</div>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    searchActions: bindActionCreators(searchActions, dispatch),
    modalActions: bindActionCreators(modalActions, dispatch),
  };
}


function mapStateToProps({ search, modal }) {
  return { search, modal };
}


export default connect(mapStateToProps, mapDispatchToProps)(Search);
