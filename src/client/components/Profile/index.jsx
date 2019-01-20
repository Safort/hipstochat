import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import store from '../../store';
import * as userActions from '../../actions/user';
import * as styles from './index.css';

class Profile extends Component {
  constructor() {
    super();

    this._save = this.save.bind(this);
  }

  componentDidMount() {
    if (!this.props.user.login) {
      this.props.userActions.loadInfo().then(() => {
        if (!store.getState().user.login) {
          this.props.history.push('/auth');
        }
      });
    }
  }

  save() {
    this.props.userActions.update({
      login: this._login.value,
      name: this._name.value,
    });
  }

  render() {
    const {
      user: { login, name },
    } = this.props;

    return (
      <div className={styles.profileEdit}>
        <div className="profile">
          <input
            ref={login => {
              this._login = login;
            }}
            placeholder="login"
            defaultValue={login}
          />
          <br />
          <input
            ref={name => {
              this._name = name;
            }}
            placeholder="name"
            defaultValue={name}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
