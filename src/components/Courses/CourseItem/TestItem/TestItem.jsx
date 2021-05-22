import React, {useEffect, useState} from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllChapterTests,
  addTestAnswer,
  editChapterTest,
  deleteChapterTest,
} from "../../../../redux/coursesReducer";
import s from "./TestItem.module.css";

const SignupSchema = Yup.object().shape({
  question: Yup.string(),
  answer1: Yup.string(),
  answer2: Yup.string(),
  answer3: Yup.string(),
  answer4: Yup.string(),
  correct_answer: Yup.number()
    .max(4, "В тесте 4 варианта ответа")
    .min(1, "Варианты ответов с 1 до 4"),
  score: Yup.number().max(100, "Максимальный балл за тест 100"),
});

const TestItem = (props) => {
  const isTeacher = useSelector((s) => s.profilePage.isTeacher);
  const isFetching = useSelector((s) => s.coursesPage.isFetching);
  const [answerNum, setAnswerNum] = useState(0);
  const courseId = props.courseId;
  const chapterId = props.chapterId;
  const testsData = useSelector((s) => s.coursesPage.testsData);
  const answersData = useSelector((s) => s.coursesPage.answersData);
  const handleInputChange = (e) => {
    setAnswerNum(e.target.value);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllChapterTests(courseId, chapterId));
  }, [dispatch, courseId, chapterId, testsData.length, answersData.length]);
  return (
    <div className={s.testBlock}>
      {testsData.length > 0
        ? testsData.map((test) => (
            <div className={s.mainTest} key={test.id}>
              <div>
                <div className={s.testQuestion}>{test.question}</div>
                <div>
                  <label>
                    <input
                      name="answer"
                      type="radio"
                      value="1"
                      onChange={handleInputChange}
                    />
                    {test.answer1}
                  </label>
                  <label>
                    <input
                      name="answer"
                      type="radio"
                      value="2"
                      onChange={handleInputChange}
                    />
                    {test.answer2}
                  </label>
                  <label>
                    <input
                      name="answer"
                      type="radio"
                      value="3"
                      onChange={handleInputChange}
                    />
                    {test.answer3}
                  </label>
                  <label>
                    <input
                      name="answer"
                      type="radio"
                      value="4"
                      onChange={handleInputChange}
                    />
                    {test.answer4}
                  </label>
                </div>
                <button
                  className={s.testBtn}
                  onClick={() => dispatch(addTestAnswer(test.id, answerNum))}
                >
                  Отправить ответ
                </button>
              </div>
              <div>
                {answersData.length > 0 ? (
                  answersData
                    .filter((it) => it.test_id === test.id)
                    .map((answerItem) => (
                      <div key={answerItem.id}>
                        {answerItem.correct === true ? (
                          <span className={s.greenAnswer}>
                            Правильно, Вам начислено {test.score} баллов
                          </span>
                        ) : (
                          <span className={s.redAnswer}>Ответ неверный</span>
                        )}
                      </div>
                    ))
                ) : (
                  <span className={s.needAnswer}>Тест не пройден</span>
                )}
              </div>
              {isTeacher && (
                <div className={s.editOrange}>
                  <div className={s.editBlock}>
                    <div>Изменить вопрос и варианты ответов для теста</div>
                    <div className={s.newCourseBlock}>
                      <Formik
                        initialValues={{
                          question: "",
                          answer1: "",
                          answer2: "",
                          answer3: "",
                          answer4: "",
                          correct_answer: null,
                          score: null,
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={(values) => {
                          // same shape as initial values
                          dispatch(
                            editChapterTest(
                              courseId,
                              chapterId,
                              test.id,
                              values.question,
                              values.answer1,
                              values.answer2,
                              values.answer3,
                              values.answer4,
                              values.correct_answer,
                              values.score
                            )
                          );
                          console.log(values);
                        }}
                      >
                        {({ errors, touched }) => (
                          <Form>
                            <div className={s.inputsFlex}>
                              <Field
                                className={s.regInputTest}
                                placeholder="Введите вопрос для теста"
                                name="question"
                              />
                              {errors.question && touched.question ? (
                                <div className={s.formControl}>
                                  {errors.question}
                                </div>
                              ) : null}
                              <Field
                                className={s.regInputTest2}
                                placeholder="Введите первый вариант ответа"
                                name="answer1"
                              />
                              {errors.answer1 && touched.answer1 ? (
                                <div className={s.formControl}>
                                  {errors.answer1}
                                </div>
                              ) : null}
                              <Field
                                className={s.regInputTest2}
                                placeholder="Введите второй вариант ответа"
                                name="answer2"
                              />
                              {errors.answer2 && touched.answer2 ? (
                                <div className={s.formControl}>
                                  {errors.answer2}
                                </div>
                              ) : null}
                              <Field
                                className={s.regInputTest2}
                                placeholder="Введите третий вариант ответа"
                                name="answer3"
                              />
                              {errors.answer3 && touched.answer3 ? (
                                <div className={s.formControl}>
                                  {errors.answer3}
                                </div>
                              ) : null}
                              <Field
                                className={s.regInputTest2}
                                placeholder="Введите третий вариант ответа"
                                name="answer4"
                              />
                              {errors.answer4 && touched.answer4 ? (
                                <div className={s.formControl}>
                                  {errors.answer4}
                                </div>
                              ) : null}
                              <Field
                                className={s.regInputTest2}
                                placeholder="Введите номер правильного варианта ответа"
                                name="correct_answer"
                                type="number"
                              />
                              {errors.correct_answer &&
                              touched.correct_answer ? (
                                <div className={s.formControl}>
                                  {errors.correct_answer}
                                </div>
                              ) : null}
                              <Field
                                className={s.regInputTest2}
                                placeholder="Введите количество баллов за правильный ответ"
                                name="score"
                                type="number"
                              />
                              {errors.score && touched.score ? (
                                <div className={s.formControl}>
                                  {errors.score}
                                </div>
                              ) : null}
                              <div>
                                <button disabled={isFetching} type="submit">
                                  Редактировать тест
                                </button>
                              </div>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </div>
                  <div>
                    <button
                      className={s.redTestBtn}
                      onClick={() =>
                        dispatch(
                          deleteChapterTest(courseId, chapterId, test.id)
                        )
                      }
                    >
                      Удалить тест
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        : "Глава не содержит тестов"}
    </div>
  );
};

export default TestItem
