import React, { useState } from "react";
import Input from "../../utils/Input";
import { useSelector, useDispatch } from "react-redux";
import { setPopupDisplay } from "../../redux/fileReducer";
import { createDirAPI } from "../../api/api";
import st from "./Disk.module.css";

const Popup = () => {
  const [dirName, setDirName] = useState("");
  const popupDisplay = useSelector((s) => s.files.popupDisplay);
  const currentDir = useSelector((s) => s.files.currentDir);
  const dispatch = useDispatch();

  function createHandler() {
    dispatch(createDirAPI(currentDir, dirName));
  }

  return (
    <div
      className={st.popup}
      onClick={() => dispatch(setPopupDisplay("none"))}
      style={{ display: popupDisplay }}
    >
      <div className={st.popup__content} onClick={(e) => e.stopPropagation()}>
        <div className={st.popup__header}>
          <div className={st.popup__title}>Cоздать новую папку</div>
          <button
            className={st.popup__close}
            onClick={() => dispatch(setPopupDisplay("none"))}
          >
            X
          </button>
        </div>
        <Input
          type="text"
          placeholder="Введите название папки..."
          value={dirName}
          setValue={setDirName}
        />
        <button
          className={st.popup__create}
          onClick={() => createHandler(dispatch(setPopupDisplay("none")))}
        >
          Создать
        </button>
      </div>
    </div>
  );
};

export default Popup;
