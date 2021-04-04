import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";

let store = {
  _state: {
  profilePage: {
    postsData: [
      { id: 1, message: "first post!", likesCount: 12 },
      { id: 2, message: "Give me more likes", likesCount: 23 },
      { id: 3, message: "Durofff verni stenu!!!", likesCount: 1 }
    ],
    newPostText: 'Pupiiiiiiii'
  },
  dialogsPage: {
    dialogsData: [
      { id: 1, name: "Pupsik" },
      { id: 2, name: "Baby" },
      { id: 3, name: "Alyosha" },
    ],
    messagesData: [
      { id: 1, message: "Hi, edreniy!" },
      { id: 2, message: "How are you???" },
    ],
    newMessageText: ''
  }
  },
  _callSubscriber() {
    console.log('do you need state?')
  },

  getState() {
    return this._state
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {

    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._callSubscriber(this._state);
  }
}

window.store = store;

export default store
