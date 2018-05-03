import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Form from './Form';
import * as messageActions from '../../actions/message';
import * as styles from './index.css';


const Message = ({ name, text, date }) => (
  <div className={styles.message}>
    <div className={styles.messageAvatar} />
    <div className={styles.messageContent}>
      <div className={styles.messageUsername}>{name}</div>
      <div className={styles.messageDate}>{date}</div>
      <div className={styles.messageText}>{text}</div>
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
      dialogId: this.props.match.params.dialogId,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { dialogId } = nextProps.match.params;

    if (dialogId !== this.props.match.params.dialogId) {
      this.props.messageActions.fetchMessages({ dialogId });
    }
  }

  sendMessage(text) {
    this.props.messageActions.sendMessage({
      dialogId: this.props.match.params.dialogId,
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
        <div className={styles.list}>{messages}</div>
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
