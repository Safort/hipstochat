import React from 'react';


const Avatar = ({ username }) => (
  <div className="avatar" data-content={username.substring(0, 2)}>
  </div>
);


export default Avatar;
