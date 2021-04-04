import React from "react";
import { useSelector } from "react-redux";
import File from "./File/File";
import st from "../Disk.module.css";

const FileList = () => {
  const files = useSelector((s) => s.files.files).map((file) => (
    <File file={file} key={file._id} />
  ));

  return (
    <div className={st.filelist}>
      <div className={st.filelist__header}>
        <div className={st.filelist__name}>Название</div>
        <div className={st.filelist__date}>Дата</div>
        <div className={st.filelist__size}>Размер</div>
      </div>
      {files}
    </div>
  );
};

export default FileList;
