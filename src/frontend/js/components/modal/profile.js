import React from 'react';


const Profile = ({ user }) => (
  <div className="modal-profile">
    <div className="modal-profile__title">
      Contact info
    </div>
    <div className="modal-profile__info">
      username: {user.username}
    </div>
  </div>
);


export default Profile;
