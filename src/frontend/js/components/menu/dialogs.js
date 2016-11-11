import React from 'react';
import { Link } from 'react-router';
import Dialog from './dialog';


const Plus = () => (
  <Link className="dialogs__plus" to={'/search'}>+</Link>
);


export default ({ list, dialogActions }) => {
  const dialogs = list.map((dialog, i) => (
    <Dialog key={i} dialogActions={dialogActions} {...dialog} />
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
};
