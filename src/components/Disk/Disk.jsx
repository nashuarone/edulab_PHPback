import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFilesAPI, searchFileAPI, uploadFileAPI } from "../../api/api";
import FileList from "./FileList/FileList";
import Popup from "./Popup";
import { setPopupDisplay, setCurrentDir } from "../../redux/fileReducer";
import st from './Disk.module.css'

const Disk = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector((s) => s.files.currentDir);
  const dirStack = useSelector((s) => s.files.dirStack);
  const [searchName, setSearchName] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(false)

  useEffect(() => {
    dispatch(getFilesAPI(currentDir));
  }, [currentDir, dispatch]);

  function showPopupHandler() {
    dispatch(setPopupDisplay("flex"));
  }

  function backHandler() {
    const backDirId = dirStack.pop();
    dispatch(setCurrentDir(backDirId));
  }

  function fileUploadHandler(e) {
    const files = [...e.target.files];
    files.forEach(file => dispatch(uploadFileAPI(file, currentDir)))
  }

  function searchHandler(e) {
    setSearchName(e.target.value)
    if (searchTimeout !== false) {
      clearTimeout(searchTimeout)
    }
    if (e.target.value !== "") {
      setSearchTimeout(setTimeout((value) => {
        dispatch(searchFileAPI(value))
      }, 500, e.target.value))
    } else {
      dispatch(getFilesAPI(currentDir))
    }

  }

  return (
    <div className={st.disk}>
      <div className={st.disk__btns}>
        <button className={st.disk__back} onClick={() => backHandler()}>
          Назад
        </button>
        <button className={st.disk__create} onClick={() => showPopupHandler()}>
          Создать папку
        </button>
        <div className={st.disk__upload}>
          <label htmlFor="disk__uploadInput" className={st.disk__uploadLabel}>
            Загрузить файл
          </label>
          <input
            type="file"
            id="disk__uploadInput"
            className={st.disk__uploadInput}
            multiple={true}
            onChange={(e) => fileUploadHandler(e)}
          />
        </div>
        <div>
          <input
            className={st.searchInput}
            type="text"
            placeholder="Поиск..."
            value={searchName}
            onChange={(e) => searchHandler(e)}
          />
        </div>
      </div>
      <FileList />
      <Popup />
    </div>
  );
};

export default Disk;
