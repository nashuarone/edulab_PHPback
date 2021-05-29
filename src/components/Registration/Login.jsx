import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import { loginAPI } from '../../api/api'
import { getUserProfile } from "../../redux/profileReducer";
import s from "./Registration.module.css"

const Login = () => {
  const isLoginFetching = useSelector((s) => s.profilePage.isLoginFetching);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handlleChangeE = (e) => {
    setEmail(e.target.value)
  }
  const handlleChangeP = (e) => {
    setPassword(e.target.value);
  };
  const dispatch = useDispatch()
  return (
    <div className={s.mainLoginForm}>
      <h1>Вход</h1>
      <div className={s.inputsFlex}>
        <input
          className={s.regInput}
          value={email}
          onChange={handlleChangeE}
          type="text"
          placeholder="Введите email"
        />
        <input
          className={s.regInput}
          value={password}

          onChange={handlleChangeP}
          type="password"
          placeholder="Введите пароль"
        />
        <button
          disabled={isLoginFetching}
          className={s.regBtn}
          onClick={() => dispatch(getUserProfile(email, password))}
        >
          Войти
        </button>
      </div>
    </div>
  );
}

export default Login;
