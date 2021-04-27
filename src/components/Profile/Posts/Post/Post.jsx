import React from 'react'
import s from "./Post.module.css";


const Post = (props) => {
  return (
    <div className={s.item}>
      <img
        src="https://media.gettyimages.com/vectors/human-face-avatar-icon-profile-for-social-network-man-vector-vector-id1227618765"
        alt=""
      />
      {props.message}
      <div><i className="far fa-heart"></i> {props.likesCount}</div>
    </div>
  );
};

export default Post;