import React from 'react';

import styles from './index.css';


const Avatar = ({ username }) => (
  <div className={styles.avatar} data-content={username && username.substring(0, 2)} />
);


export default Avatar;
