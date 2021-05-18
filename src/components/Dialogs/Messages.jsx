import React from "react";
import { useSelector } from "react-redux";
import s from "./Dialogs.module.css";

const Messages = () => {
  const mailMessagesData = useSelector((s) => s.dialogsPage.mailMessagesData);

  return (
    <div className={s.dialogs}>
      <div className={s.messages}>
        <div>Сообщения от пользователей</div>
        <div>
          {mailMessagesData.map((mes) => (
            <div className={s.courseItem} key={mes.id}>
              <div className={s.courseItemFlex}>
                <div>{mes.message}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Messages;
