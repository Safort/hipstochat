import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as searchActions from '../../actions/searchActions';
import * as modalActions from '../../actions/modalActions';
import User from './user';


class Search extends Component {
  constructor(props) {
    super(props);

    this._find = this.find.bind(this);
  }

  componentWillMount() {
    this.props.searchActions.clear();
  }


  find() {
    const username = this.refs.username.value;

    this.props.searchActions.findUser({ username });
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
            ref="username"
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


function mapStateToProps(state) {
  return {
    search: state.search,
    modal: state.modal,
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Search);
