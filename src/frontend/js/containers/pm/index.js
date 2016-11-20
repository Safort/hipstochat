import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as messageActions from '../../actions/message';

import Form from './form';
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


class PM extends Component {
  constructor() {
    super();

    this._sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    this.props.messageActions.fetchMessages({
      dialogId: this.props.params.dialogId,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { dialogId } = nextProps.params;

    if (dialogId !== this.props.params.dialogId) {
      this.props.messageActions.fetchMessages({ dialogId });
    }
  }

  sendMessage(text) {
    console.log(this.props);
    this.props.messageActions.sendMessage({
      dialogId: this.props.params.dialogId,
      text,
    });
  }

  render() {
    const { list } = this.props.messages;
    const messages = list ? list.map(({ name, date, text, _id: id }) => (
      <Message key={id} name={name} text={text} date={date} />
    )) : null;

    return (
      <div className="pm">
        <div className="pm-list">{messages}</div>
        <Form sendMessage={this._sendMessage} />
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    messageActions: bindActionCreators(messageActions, dispatch),
  };
}


function mapStateToProps({ user, dialogs, messages }) {
  return { user, dialogs, messages };
}


export default connect(mapStateToProps, mapDispatchToProps)(PM);
