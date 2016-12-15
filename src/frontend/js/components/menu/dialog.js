import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './dialogs.css';


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
      <div className={styles.dialogsItem}>
        <Link to={`/pm/${id}`}>{name}</Link>
        <button onClick={this._onClick}>[-]</button>
      </div>
    );
  }
}
