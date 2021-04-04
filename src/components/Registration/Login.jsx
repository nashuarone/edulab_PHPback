import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginAPI } from '../../api/api'
import s from "./Registration.module.css"

const Login = () => {
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
      <h1>Log in</h1>
      <div className={s.inputsFlex}>
        <input
          className={s.regInput}
          value={email}
          onChange={handlleChangeE}
          type="text"
          placeholder="Ведите email"
        />
        <input
          className={s.regInput}
          value={password}
          onChange={handlleChangeP}
          type="password"
          placeholder="Введите пароль"
        />
        <button
          className={s.regBtn}
          onClick={() => dispatch(loginAPI(email, password))}
        >
          Войти
        </button>
      </div>
    </div>
  );
}

export default Login;
