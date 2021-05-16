import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { createUserProfile } from "../../redux/profileReducer";
import s from "./Registration.module.css";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required("Обязательное поле"),
  lastName: Yup.string().required("Обязательное поле"),
  birthdate: Yup.date()
    .max(new Date(Date.now() - 567648000000), "Вам должно быть не менее 18 лет")
    .required("Обязательное поле"),
  password: Yup.string()
    .min(6, "Минимальная длина пароля 6 символов")
    .max(50, "Притормози!")
    .required("Обязательное поле"),
  email: Yup.string().email("Невалидный email").required("Обязательное поле"),
});

export const RegistrationForm = () => {
  const dispatch = useDispatch();
  const isLoginFetching = useSelector((s) => s.profilePage.isLoginFetching);
  return (
    <div className={s.mainLoginForm}>
      <h1>Регистрация</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          birthdate: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          // same shape as initial values
          dispatch(
            createUserProfile(
              values.email,
              values.password,
              values.firstName,
              values.lastName,
              values.birthdate
            )
          );
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className={s.inputsFlex}>
              <Field
                className={s.regInput}
                placeholder="Введите email"
                name="email"
                type="email"
              />
              {errors.email && touched.email ? (
                <div className={s.formControl}>{errors.email}</div>
              ) : null}
              <Field
                className={s.regInput}
                placeholder="Введите пароль"
                name="password"
                type="password"
              />
              {errors.password && touched.password ? (
                <div className={s.formControl}>{errors.password}</div>
              ) : null}
              <Field
                className={s.regInput}
                placeholder="Введите имя"
                name="firstName"
              />
              {errors.firstName && touched.firstName ? (
                <div className={s.formControl}>{errors.firstName}</div>
              ) : null}
              <Field
                className={s.regInput}
                placeholder="Введите фамилию"
                name="lastName"
              />
              {errors.lastName && touched.lastName ? (
                <div className={s.formControl}>{errors.lastName}</div>
              ) : null}
              <Field className={s.regInput} name="birthdate" type="date" />
              {errors.birthdate && touched.birthdate ? (
                <div className={s.formControl}>{errors.birthdate}</div>
              ) : null}
              <button
                disabled={isLoginFetching}
                className={s.regBtn}
                type="submit"
              >
                Зарегистрироваться
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}