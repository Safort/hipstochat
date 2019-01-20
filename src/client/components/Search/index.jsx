import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import store from '../../store';
import User from './User';
import * as userActions from '../../actions/user';
import * as searchActions from '../../actions/search';
import * as modalActions from '../../actions/modal';
import * as styles from './index.css';

class Search extends Component {
  constructor(props) {
    super(props);

    this._find = this.find.bind(this);
  }

  componentDidMount() {
    this.props.searchActions.clear();

    if (!this.props.user.login) {
      this.props.userActions.loadInfo().then(() => {
        if (!store.getState().user.login) {
          this.props.history.push('/auth');
        }
      });
    }
  }

  // TODO: add debouncer
  find() {
    const login = this._login.value.trim();

    if (login.length >= 2) {
      this.props.searchActions.findUser({ login });
    }
  }

  render() {
    const users = this.props.search.users.map((user, i) => (
      <User key={i} modalActions={this.props.modalActions} data={user} />
    ));

    return (
      <div className={styles.search}>
        <header className={styles.header}>
          <input
            className={styles.input}
            ref={login => {
              this._login = login;
            }}
            placeholder="Enter user login"
            onKeyUp={this._find}
          />
        </header>
        <div className={styles.users}>{users}</div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    searchActions: bindActionCreators(searchActions, dispatch),
    modalActions: bindActionCreators(modalActions, dispatch),
  };
}

function mapStateToProps({ search, modal, user }) {
  return { search, modal, user };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
