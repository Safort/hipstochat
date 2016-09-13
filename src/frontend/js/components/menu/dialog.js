import React, { Component } from 'react';
import { Link } from 'react-router';


export default class Dialog extends Component {
  constructor() {
    super();

    this._onClick = this.onClick.bind(this);
  }


  onClick() {
    const { dialogUserId } = this.props;
    this.props.dialogsActions.remove({ dialogUserId });
  }


  render() {
    const { dialogUserId, dialogName } = this.props;

    return (
      <div className="dialogs__item">
        <Link to={`/pm/${dialogUserId}`}>{dialogName}</Link>
        <span onClick={this._onClick}>[-]</span>
      </div>
    );
  }
}
