import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../../actions/userActions';

import './index.css';


const Message = ({ name, text, date }) => (
  <div className="pm-message">
    <div className="pm-message__avatar" />
    <div className="pm-message__content">
      <div className="pm-message__username">{name}</div>
      <div className="pm-message__date">{date}</div>
      <div className="pm-message__text">{text}</div>
    </div>
  </div>
);


const Form = () => (
  <form className="pm-form">
    <textarea className="pm-form__input" />
    <div className="pm-panel">
      <input className="pm-form__send" type="submit" value="Send" />
    </div>
  </form>
);


class PM extends Component {
  render() {
    const { list } = this.props.dialogs;
    const messages = list ? list.map(({ name, date, id, text }) => (
      <Message key={id} name={name} text={text} date={date} />
    )) : null;

    return (
      <div className="pm">
        <div className="pm-list">{messages}</div>
        <Form />
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
  };
}


function mapStateToProps({ user, dialogs }) {
  return { user, dialogs };
}


export default connect(mapStateToProps, mapDispatchToProps)(PM);
