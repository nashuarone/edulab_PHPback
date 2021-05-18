import { addFeedbackMessageAPI, getAllFeedbackMessagesAPI } from "../api/api";

const SEND_MESSAGE = "SEND-MESSAGE";
const UPDATE_MESSAGE_TEXT = "UPDATE-MESSAGE-TEXT";
const SEND_MESSAGE_MAIL = "SEND_MESSAGE_MAIL";
const GET_MESSAGES_MAIL = "GET_MESSAGE_MAIL";

// else if zarefactori v switch pozhaluista pozzhe - sebe govoryu

let initialState = {
  dialogsData: [
    { id: 1, name: "Pupsik" },
    { id: 2, name: "Baby" },
    { id: 3, name: "Alyosha" },
  ],
  messagesData: [
    { id: 1, message: "Hi, edreniy!" },
    { id: 2, message: "How are you???" },
  ],
  newMessageText: "",
  mailMessagesData: [],
};

const dialogsReducer = (state_d = initialState, action) => {
  if (action.type === SEND_MESSAGE) {
    let newMessage = {
      id: 3,
      message: state_d.newMessageText,
    };
    return {
      ...state_d,
      messagesData: [...state_d.messagesData, newMessage],
      newMessageText: "",
    };
  } else if (action.type === UPDATE_MESSAGE_TEXT) {
    return {
      ...state_d,
      newMessageText: action.message,
    };
  } else if (action.type === SEND_MESSAGE_MAIL) {
    return {
      ...state_d,
      mailMessagesData: [...state_d.mailMessagesData, action.message],
    };
  } else if (action.type === GET_MESSAGES_MAIL) {
    return {
      ...state_d,
      mailMessagesData: [...action.messages],
    };
  }
  return state_d;
};

export const sendMessageActionCreator = () => ({ type: SEND_MESSAGE });
export const setMailMessage = (message) => ({
  type: SEND_MESSAGE_MAIL,
  message,
});
export const setAllMailMessages = (messages) => ({
  type: GET_MESSAGES_MAIL,
  messages,
});

export const updateMessageTextActionCreator = (newMessageUI) => ({
  type: UPDATE_MESSAGE_TEXT,
  message: newMessageUI,
});
export const addFeedbackMessage = (message) => {
  return (dispatch) => {
    //dispatch(toggleIsFetching(true));
    addFeedbackMessageAPI(message).then((message) => {
      //dispatch(toggleIsFetching(false));
      dispatch(setMailMessage(message));
      console.log(message);
    });
  };
};
export const getAllFeedbackMessages = () => {
  return (dispatch) => {
    //dispatch(toggleIsFetching(true));
    getAllFeedbackMessagesAPI().then((messages) => {
      //dispatch(toggleIsFetching(false));
      dispatch(setAllMailMessages(messages));
      console.log(messages);
    });
  };
};

export default dialogsReducer;
