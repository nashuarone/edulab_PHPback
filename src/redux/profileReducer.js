import {
  registrationAPI,
  loginAPI,
  uploadAvatarAPI,
  deleteAvatarAPI,
  getAnotherUserAPI,
  updateUserDataAPI,
} from "../api/api";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const ADD_PROFILE_NAME = "ADD_PROFILE_NAME";
const UPDATE_PROFILE_NAME = "UPDATE_PROFILE_NAME";
const SET_LEARNER = "SET_LEARNER";
const SET_OTHER_LEARNER = "SET_OTHER_LEARNER";
const LOGOUT = "LOGOUT";
const TOGGLE_IS_LOGIN_BUTTON = "TOGGLE_IS_LOGIN_BUTTON";

let initialState = {
  profileData: {},
  otherProfileData: {},
  postsData: [
    { id: 1, message: "first post!", likesCount: 12 },
    { id: 2, message: "Give me more likes", likesCount: 23 },
    { id: 3, message: "Durofff verni stenu!!!", likesCount: 1 },
  ],
  newPostText: "Рыба для поста",
  newNameText: "",
  isAuth: false,
  isAdminos: false,
  isTeacher: false,
  isLoginFetching: false,
};

const profileReducer = (state_p = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 4,
        message: state_p.newPostText,
        likesCount: 0,
      };
      let stateCopy = { ...state_p };
      stateCopy.postsData = [...state_p.postsData];
      stateCopy.postsData.push(newPost);
      stateCopy.newPostText = "";
      return stateCopy;
    }
    case UPDATE_NEW_POST_TEXT: {
      let stateCopy = { ...state_p };
      stateCopy.newPostText = action.text;
      return stateCopy;
    }
    case ADD_PROFILE_NAME: {
      let name = state_p.newNameText;
      return {
        ...state_p,
        profileData: {
          ...state_p.profileData,
          myname: name,
        },
        newNameText: "",
      };
    }
    case UPDATE_PROFILE_NAME: {
      return {
        ...state_p,
        newNameText: action.name,
      };
    }
    case SET_LEARNER: {
      if (action.payload.role === 2) {
        return {
          ...state_p,
          profileData: action.payload,
          isAuth: true,
          isAdminos: true,
          isTeacher: true,
        };
      }
      if (action.payload.role === 1) {
        return {
          ...state_p,
          profileData: action.payload,
          isAuth: true,
          isTeacher: true,
        };
      }
      return {
        ...state_p,
        profileData: action.payload,
        isAuth: true,
      };
    }
    case SET_OTHER_LEARNER: {
      return {
        ...state_p,
        otherProfileData: action.payload,
      };
    }
    case LOGOUT: {
      localStorage.removeItem("token");
      return {
        ...state_p,
        profileData: {},
        isAuth: false,
        isAdminos: false,
        isTeacher: false,
      };
    }
    case TOGGLE_IS_LOGIN_BUTTON:
      return {
        ...state_p,
        isLoginFetching: action.fetchingStatus,
      };
    default:
      return state_p;
  }
}

export const addPostActionCreator = () => ({ type: ADD_POST });
export const updateNewPostTextActionCreator = (postMessageUI) => ({
  type: UPDATE_NEW_POST_TEXT,
  text: postMessageUI,
});
export const addProfileDataAC = () => ({ type: ADD_PROFILE_NAME });
export const updateProfileNameAC = (newProfileData) => ({
  type: UPDATE_PROFILE_NAME,
  name: newProfileData,
});
export const setLearner = (learner) => ({
  type: SET_LEARNER,
  payload: learner,
});
export const setOtherLearner = (user) => ({
  type: SET_OTHER_LEARNER,
  payload: user,
});
export const logout = () => ({
  type: LOGOUT,
});
export const toggleIsLoginButton = (fetchingStatus) => ({
  type: TOGGLE_IS_LOGIN_BUTTON,
  fetchingStatus,
});

export const createUserProfile = (email, password, first_name, second_name, birth_date) => (dispatch) => {
  dispatch(toggleIsLoginButton(true));
  registrationAPI(email, password, first_name, second_name, birth_date).then((res) => {
    dispatch(toggleIsLoginButton(false));
    console.log(res.data);
  });
};
export const getUserProfile = (email, password) => (dispatch) => {
  dispatch(toggleIsLoginButton(true));
  loginAPI(email, password).then((res) => {
    dispatch(toggleIsLoginButton(false));
    dispatch(setLearner(res.data));
  });
};
export const getAnotherUserProfile = (userId) => (dispatch) => {
  getAnotherUserAPI(userId).then((res) => {
    dispatch(setOtherLearner(res.data));
  });
};
export const putUserAvatar = (avatar) => (dispatch) => {
  uploadAvatarAPI(avatar).then((res) => {
    dispatch(setLearner(res.data));
  });
};
export const deleteUserAvatar = (avatar) => (dispatch) => {
  deleteAvatarAPI(avatar).then((res) => {
    dispatch(setLearner(res.data));
  });
};
export const putUserProfile = (
  email,
  first_name,
  second_name,
  birth_date,
  third_name,
  gender,
  city,
  tel
) => (dispatch) => {
  updateUserDataAPI(
    email,
    first_name,
    second_name,
    birth_date,
    third_name,
    gender,
    city,
    tel
  ).then((res) => {
    dispatch(setLearner(res.data));
  });
};

export default profileReducer;
