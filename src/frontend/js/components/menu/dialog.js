import React, { Component } from 'react';
import { Link } from 'react-router';


export default class Dialog extends Component {
  constructor() {
    super();

    this._onClick = this.onClick.bind(this);
  }


  onClick() {
    this.props.dialogActions.remove({ id: this.props.id });
  }


  render() {
    const { id, name } = this.props;

    return (
      <div className="dialogs__item">
        <Link to={`/pm/${id}`}>{name}</Link>
        <button onClick={this._onClick}>[-]</button>
      </div>
    );
  }
}
