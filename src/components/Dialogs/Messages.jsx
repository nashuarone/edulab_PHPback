import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllFeedbackMessages } from "../../redux/dialogsReducer";
import s from "./Dialogs.module.css";

const Messages = () => {
  const dispatch = useDispatch();
  const mailMessagesData = useSelector((s) => s.dialogsPage.mailMessagesData);
  useEffect(() => {
    dispatch(getAllFeedbackMessages());
  }, [dispatch]);

  return (
    <div className={s.dialogs}>
      <div className={s.messages}>
        <div>Сообщения от пользователей</div>
        <div>
          {mailMessagesData.map((mes) => (
            <div className={s.courseItem} key={mes.id}>
              <div className={s.messageBock}>
                <div className={s.messageItem}>{mes.message}</div>
                <div>
                  <NavLink to={"/profile/" + mes.id}>
                    <span>Перейти в профиль пользователя</span>
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Messages;
