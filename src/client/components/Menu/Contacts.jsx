import React from 'react';
import { Link } from 'react-router-dom';
import Contact from './Contact';
import styles from './Contacts.css';

const Plus = () => (
  <Link className={styles.plus} to={'/search'}>
    +
  </Link>
);

export default ({ contacts, contactActions }) => {
  const list = contacts.list
    ? contacts.list.map((contact, i) => (
        <Contact key={i} contactActions={contactActions} {...contact} />
      ))
    : null;

  return (
    <div className={styles.contacts}>
      <header className={styles.header}>
        <div className={styles.title}>Contacts {`(${list ? list.length : 0})`}</div>
        <Plus />
      </header>
      <div className={styles.list}>{list}</div>
    </div>
  );
};
