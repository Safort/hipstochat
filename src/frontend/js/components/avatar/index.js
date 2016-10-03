import React from 'react';
import './index.css';


const Avatar = ({ username }) => (
  <div className="avatar" data-content={username.substring(0, 2)} />
);


export default Avatar;
