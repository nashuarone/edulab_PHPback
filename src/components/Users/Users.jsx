import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import s from "./Users.module.css";
import userPhoto from "../../assets/images/userPhoto.png";
import { getUsers, deleteUserProfile, putUserRole } from "../../redux/usersReducer";

const Users = (props) => {
  const [page, setPage] = useState(1)
  const usersPage = useSelector((s) => s.usersPage);
  const isFetching = useSelector((s) => s.usersPage.isFetching);
  let pageNumber = Math.ceil(usersPage.totalCount / usersPage.pageSize);
  let pages = [];
  for (let i = 1; i <= pageNumber; i++) {
    pages.push(i);
  }
  //debugger
  const users = useSelector((s) => s.usersPage.users);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers(page, usersPage.pageSize));
  }, [dispatch, page, usersPage.pageSize]);
  return (
    <div>
      <div>
        {pages.map((p, ind) => {
          return (
            <button
              onClick={(e) => {
                setPage(p);
              }}
            >
              <span
                key={ind}
                className={usersPage.currentPage === p && s.selectedPage}
              >
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
              {u.role === 0
                ? "Пользователь"
                : u.role === 1
                ? "Преподаватель"
                : "Admin"}
            </div>
            <div>
              {u.role === 0 ? (
                <button
                  disabled={isFetching}
                  onClick={() => dispatch(putUserRole(u.id, 1))}
                >
                  <i className="fas fa-book-open"></i> Назначить преподавателем
                </button>
              ) : (
                <button
                  disabled={isFetching}
                  onClick={() => dispatch(putUserRole(u.id, 2))}
                >
                  <i className="fas fa-jedi"></i> Посвятить в Админы
                </button>
              )}
            </div>
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
