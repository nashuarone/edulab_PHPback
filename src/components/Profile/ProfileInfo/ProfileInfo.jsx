import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAvatarAPI, uploadAvatarAPI } from "../../../api/api";
import { API_URL } from "../../../config";
import s from "./ProfileInfo.module.css";

const ProfileInfo = (props) => {
  const dispatch = useDispatch()
  const currentLearner = useSelector((s) => s.profilePage.profileData);
  const avatarLogo = `${API_URL + currentLearner.avatar}`;

  let surname = props.profileData.surname
  let myname = props.profileData.myname
  let email = props.profileData.email;

  let newName = React.createRef();

  let updateNameUI = () => {
    props.addProfileData();
    //props.dispatch(addPostActionCreator());
  };

  let newNameUI = (e) => {
    let postNameUI = e.target.value;
    //props.updateNewPostText(postMessageUI);
    props.updateProfileData(postNameUI);
  };

  function avatarUpHandler(e) {
    const avatarFile = e.target.files[0]
    dispatch(uploadAvatarAPI(avatarFile))
  }

  return (
    <div>
      <h3>Мой профиль</h3>
      <div className={s.mainProfile}>
        <div>
          <div className={s.profileItem}>
            <div className={s.profileItemHalf}>
              <div className={s.boldValue}>Имя</div>
              <div className={s.postBlock}>{myname}</div>
              <i className="fas fa-pencil-alt"></i>
            </div>
            <div className={s.profileItemHalf}>
              <div>
                <input
                  placeholder="Введите имя..."
                  onChange={newNameUI}
                  ref={newName}
                  value={props.newNameText}
                ></input>
              </div>
              <div>
                <button onClick={updateNameUI}>Поменять имя</button>
              </div>
            </div>
          </div>
          <div className={s.profileItem}>
            <div className={s.profileItemHalf}>
              <div className={s.boldValue}>Фамилия</div>
              <div className={s.postBlock}>{surname}</div>
            </div>
          </div>
          <div className={s.profileItem}>
            <div className={s.profileItemHalf}>
              <div className={s.boldValue}>e-mail</div>
              <div className={s.postBlock}>{email}</div>
            </div>
          </div>
        </div>
        <div>
          <div className={s.avatarBlock}>
            <img src={avatarLogo} alt="" />
          </div>
          <div className={s.buttonsBlock}>
            <button onClick={() => dispatch(deleteAvatarAPI())}>
              Удалить аватар
            </button>
            {/* <div className={s.disk__upload}>
              <label
                htmlFor="disk__uploadInput"
                className={s.disk__uploadLabel}
              >
                Загрузить аватар
              </label>
              <input
                type="file"
                id="disk__uploadInput"
                className={s.disk__uploadInput}
                multiple={true}
                onChange={(e) => avatarUpHandler(e)}
              />
            </div> */}
            <input
              onChange={(e) => avatarUpHandler(e)}
              accept="image/*"
              type="file"
              placeholder="Загрузить аватар"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
