import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './Contacts.css';


export default class Contact extends Component {
  constructor() {
    super();

    this._onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.contactActions.remove({ id: this.props.id });
  }

  render() {
    const { id, name } = this.props;

    return (
      <div className={styles.contactsItem}>
        <Link to={`/pm/${id}`}>{name}</Link>
        <button onClick={this._onClick}>[-]</button>
      </div>
    );
  }
}
