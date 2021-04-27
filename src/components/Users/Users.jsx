import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import s from "./Users.module.css";
import userPhoto from "../../assets/images/userPhoto.png";
import { getUsers, deleteUserProfile } from "../../redux/usersReducer";

const Users = (props) => {
  const usersPage = useSelector((s) => s.usersPage);
  const isFetching = useSelector((s) => s.usersPage.isFetching);
  let pageNumber = Math.ceil(usersPage.totalCount / usersPage.pageSize);
  let pages = [];
  for (let i = 1; i <= pageNumber; i++) {
    pages.push(i);
  }
  debugger
  const users = useSelector((s) => s.usersPage.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  return (
    <div>
      <div>
        {pages.map((p) => {
          return (
            <button
              onClick={(e) => {
                props.setPage(p);
              }}
            >
              <span className={usersPage.currentPage === p && s.selectedPage}>
                {p}
              </span>
            </button>
          );
        })}
      </div>
      {users.map((u) => (
        <div className={s.userItem} key={u.id}>
          <div>
            <div className={s.photosize}>
              <NavLink to={"/profile/" + u.id}>
                <img
                  alt="avatar"
                  src={u.avatar === null ? userPhoto : u.avatar}
                />
              </NavLink>
            </div>
          </div>
          <div>
            <div>{u.first_name}</div>
            <div>{u.second_name}</div>
            <div>{u.email}</div>
            <div>
              <button
                disabled={isFetching}
                className={s.regBtn}
                onClick={() => dispatch(deleteUserProfile(u.id))}
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;
