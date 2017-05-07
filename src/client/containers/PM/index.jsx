import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as messageActions from '../../actions/message';
import Form from './Form';

import styles from './index.css';


const Message = ({ name, text, date }) => (
  <div className={styles.pmMessage}>
    <div className={styles.pmMessageAvatar} />
    <div className={styles.pmMessageContent}>
      <div className={styles.pmMessageUsername}>{name}</div>
      <div className={styles.pmMessageDate}>{date}</div>
      <div className={styles.pmMessageText}>{text}</div>
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
      <div className={styles.pm}>
        <div className={styles.pmList}>{messages}</div>
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
