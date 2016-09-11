import React, { Component } from 'react';
import { Link } from 'react-router';
import Dialog from './dialog';


let Plus = () => (
  <Link className="dialogs__plus" to={'/search'}>+</Link>
);


export default class Dialogs extends Component {
  constructor() {
    super();
  }


  render() {
    const { list, dialogsActions } = this.props;
    const dialogs = list.map((dialog, i) => (
      <Dialog key={i} dialogsActions={dialogsActions} {...dialog} />
    ));

    return (
      <div className="dialogs">
        <header className="dialogs__header">
          <div className="dialogs__title">Dialogs {`(${dialogs.length})`}</div>
          <Plus />
        </header>
        <div className="dialogs__list">{dialogs}</div>
      </div>
    );
  }
}
