import React from 'react';
import styles from './index.css';


const Avatar = ({ login }) => (
  <div className={styles.avatar} data-content={login && login.substring(0, 2)} />
);


export default Avatar;
