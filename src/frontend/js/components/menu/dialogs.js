import React from 'react';
import { Link } from 'react-router';
import Dialog from './dialog';


const Plus = () => (
  <Link className="dialogs__plus" to={'/search'}>+</Link>
);


export default ({ dialogs, dialogActions }) => {
  const list = dialogs.list ? dialogs.list.map((dialog, i) => (
    <Dialog key={i} dialogActions={dialogActions} {...dialog} />
  )) : null;

  return (
    <div className="dialogs">
      <header className="dialogs__header">
        <div className="dialogs__title">Dialogs {`(${list ? list.length : 0})`}</div>
        <Plus />
      </header>
      <div className="dialogs__list">{list}</div>
    </div>
  );
};
