import React from 'react'
import PostsContainer from './Posts/PostsContainer';
import s from "./Profile.module.css";
import ProfileImg from './ProfileInfo/ProfileImg';
import ProfileInfoContainer from "./ProfileInfo/ProfileInfoContainer";


const Profile = () => {
  return (
    <div>
      <ProfileImg />
      <div className={s.leftPad}>
        <ProfileInfoContainer />
        <PostsContainer />
      </div>
    </div>
  );
};

export default Profile;