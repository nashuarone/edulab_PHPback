import { connect } from "react-redux";
import Posts from "./Posts";
import {
  updateNewPostTextActionCreator,
  addPostActionCreator,
} from "../../../redux/profileReducer";

const mapStateToProps = (state) => {
  return {
    postsData: state.profilePage.postsData,
    newPostText: state.profilePage.newPostText
  }
}

const mapDispatchToProps =(dispatch) => {
  return {
    newPost: (postMessage) => {
      dispatch(updateNewPostTextActionCreator(postMessage))
    },
    addPost: () => {
          dispatch(addPostActionCreator())
    }
  }
}

const PostsContainer = connect(mapStateToProps, mapDispatchToProps)(Posts);

export default PostsContainer;
