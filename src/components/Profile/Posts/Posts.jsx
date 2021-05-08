import React from 'react'
import Post from './Post/Post';
import s from "./Posts.module.css";


const Posts = (props) => {

  // let postsData = [
  //   { id: 1, message: "first post!", likesCount: 12 },
  //   { id: 2, message: "Give me more likes", likesCount: 23 },
  //   { id: 3, message: "Durofff verni stenu!!!", likesCount: 1 }
  // ];

  let postElements = props.postsData.map((it) => (
    <Post key={it.id} message={it.message} likesCount={it.likesCount} />
  ));

  let newTextElement = React.createRef();

  let addPostUI = () => {
    props.addPost();
    //props.dispatch(addPostActionCreator());
  }

  let newPostUI = () => {
    let postMessageUI = newTextElement.current.value;
    //props.updateNewPostText(postMessageUI);
    props.newPost(postMessageUI);
  }

  return (
    <div>
      <h3>Стена</h3>
      <div className={s.posts}>
        <textarea
          onChange={newPostUI}
          ref={newTextElement}
          value={props.newPostText}
          placeholder="О чём Вы хотите рассказать?.."
        ></textarea>
        <div>
          <button onClick={addPostUI}>Добавить пост</button>
        </div>
      </div>
      <div className={s.postBlock}>{postElements}</div>
    </div>
  );
};

export default Posts;