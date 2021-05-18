import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { addFeedbackMessage } from "../../redux/dialogsReducer";
import s from './Dialogs.module.css'


const Feedback = (props) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const handlleChangeM = (e) => {
    setMessage(e.target.value);
  };
  return (
    <div className={s.dialogs}>
      <div className={s.messages}>
        <div>
          <textarea
            placeholder="Опишите вашу проблему"
            onChange={handlleChangeM}
            value={message}
          ></textarea>
        </div>
        <div>
          <button onClick={() => dispatch(addFeedbackMessage(message))}>
            Отправить сообщение
          </button>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
