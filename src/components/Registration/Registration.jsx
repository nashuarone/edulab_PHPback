import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { createUserProfile } from "../../redux/profileReducer";
import s from "./Registration.module.css"

const Registration = () => {
  const dispatch = useDispatch();
  const isLoginFetching = useSelector((s) => s.profilePage.isLoginFetching);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [first_name, setMyname] = useState("");
  const [surname, setSurname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const handlleChangeE = (e) => {
    setEmail(e.target.value)
  }
  const handlleChangeP = (e) => {
    setPassword(e.target.value);
  };
  const handlleChangeM = (e) => {
    setMyname(e.target.value);
  };
  const handlleChangeS = (e) => {
    setSurname(e.target.value);
  };
  const handlleChangeB = (e) => {
    setBirthdate(e.target.value);
  };
  return (
    <div className={s.mainLoginForm}>
      <h1>Registration</h1>
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
        <input
          className={s.regInput}
          value={first_name}
          onChange={handlleChangeM}
          type="text"
          placeholder="Введите имя"
        />
        <input
          className={s.regInput}
          value={surname}
          onChange={handlleChangeS}
          type="text"
          placeholder="Введите фамилию"
        />
        <input
          className={s.regInput}
          value={birthdate}
          onChange={handlleChangeB}
          type="date"
        />
        <button
          disabled={isLoginFetching}
          className={s.regBtn}
          onClick={() =>
            dispatch(
              createUserProfile(email, password, first_name, surname, birthdate)
            )
          }
        >
          Зарегистрироваться
        </button>
      </div>
    </div>
  );
}

export default Registration
