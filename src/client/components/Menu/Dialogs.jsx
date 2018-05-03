import React from 'react';
import { Link } from 'react-router-dom';
import Dialog from './Dialog';
import styles from './Dialogs.css';


const Plus = () => (
  <Link className={styles.plus} to={'/search'}>+</Link>
);


export default ({ dialogs, dialogActions }) => {
  const list = dialogs.list ? dialogs.list.map((dialog, i) => (
    <Dialog key={i} dialogActions={dialogActions} {...dialog} />
  )) : null;

  return (
    <div className={styles.dialogs}>
      <header className={styles.header}>
        <div className={styles.title}>Dialogs {`(${list ? list.length : 0})`}</div>
        <Plus />
      </header>
      <div className={styles.list}>{list}</div>
    </div>
  );
};
