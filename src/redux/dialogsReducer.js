const SEND_MESSAGE = "SEND-MESSAGE";
const UPDATE_MESSAGE_TEXT = "UPDATE-MESSAGE-TEXT";

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
      newMessageText: ''
    };
  } else if (action.type === UPDATE_MESSAGE_TEXT) {
    return {
      ...state_d,
      newMessageText: action.message
    }
  }
  return state_d
}

export const sendMessageActionCreator = () => ({ type: SEND_MESSAGE });

export const updateMessageTextActionCreator = (newMessageUI) => ({
  type: UPDATE_MESSAGE_TEXT,
  message: newMessageUI,
});

export default dialogsReducer;
