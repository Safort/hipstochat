import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Profile from './Profile.js';
import Channels from './Channels.js';
import Search from './Search.js';
import Contacts from './Contacts.js';

import * as userActions from '../../actions/userActions';

class Menu extends Component {
  render() {
    let {user, userActions, contacts} = this.props;
    let chanelList = [
      { name: 'Channel' },
      { name: 'Channel 2' },
      { name: 'Channel 3' },
      { name: 'Channel 4' },
      { name: 'Channel 5' },
    ];
    let contactList = [
      { name: 'UserName', address: 'Address' },
      { name: 'UserName2', address: 'Address2' },
      { name: 'UserName3', address: 'Address3' },
      { name: 'UserName4', address: 'Address4' },
      { name: 'UserName5', address: 'Address5' },
    ];

    return (
      <div className="menu">
        <Profile user={user} userActions={userActions} />
        <Search />
        <Channels list={chanelList}/>
        <Contacts list={contactList} />
      </div>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
