import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Profile from './Profile';
import Contacts from './Contacts';
import * as userActions from '../../actions/user';
import * as contactActions from '../../actions/contact';
import * as styles from './index.css';


class Menu extends React.PureComponent {
  componentDidMount() {
    this.props.contactActions.getContacts();
  }

  render() {
    const { user, userActions, contacts, contactActions } = this.props;

    return user.login ? (
      <div className={styles.menu}>
        <Profile user={user} userActions={userActions} />
        <Contacts contacts={contacts} contactActions={contactActions} />
      </div>
    ) : null
  }
}


function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    contactActions: bindActionCreators(contactActions, dispatch),
  };
}


function mapStateToProps({ user, contacts }) {
  return { user, contacts };
}


export default connect(mapStateToProps, mapDispatchToProps)(Menu);
