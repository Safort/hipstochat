import React from 'react';
import { Link } from 'react-router';


let Dialog = ({ dialogUserId, dialogName }) => (
  <Link className="dialogs__item" to={`/pm/${dialogUserId}`}>{dialogName}</Link>
);

let Plus = () => (
  <Link className="dialogs__plus" to={'/search'}>+</Link>
);


export default ({ list }) => {
  const dialogs = list.map((dialog, i) => (
    <Dialog key={i} {...dialog} />
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
