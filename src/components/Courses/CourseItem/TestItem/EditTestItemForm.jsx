import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { addChapterTest } from "../../../../redux/coursesReducer";
import s from "../../Courses.module.css";

const SignupSchema = Yup.object().shape({
  question: Yup.string(),
  answer1: Yup.string(),
  answer2: Yup.string(),
  answer3: Yup.string(),
  answer4: Yup.string(),
  correct_answer: Yup.number()
    .max(4, "В тесте 4 варианта ответа")
    .min(1, "Варианты ответов с 1 до 4"),
  score: Yup.number()
    .max(100, "Максимальный балл за тест 100"),
});

export const EditTestItemForm = (props) => {
  const courseId = props.courseId;
  const chapterId = props.chapterId;
  const dispatch = useDispatch();
  const isFetching = useSelector((s) => s.coursesPage.isFetching);
  return (
    <div className={s.coursesPage}>
      <div className={s.editBlockTitle}>Редактор тестов для глав</div>
      <div>
        <div className={s.editBlock}>
          <div>Добавить вопрос и варианты ответов для теста</div>
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
                  addChapterTest(
                    courseId,
                    chapterId,
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
                      <div className={s.formControl}>{errors.question}</div>
                    ) : null}
                    <Field
                      className={s.regInputTest}
                      placeholder="Введите первый вариант ответа"
                      name="answer1"
                    />
                    {errors.answer1 && touched.answer1 ? (
                      <div className={s.formControl}>{errors.answer1}</div>
                    ) : null}
                    <Field
                      className={s.regInputTest}
                      placeholder="Введите второй вариант ответа"
                      name="answer2"
                    />
                    {errors.answer2 && touched.answer2 ? (
                      <div className={s.formControl}>{errors.answer2}</div>
                    ) : null}
                    <Field
                      className={s.regInputTest}
                      placeholder="Введите третий вариант ответа"
                      name="answer3"
                    />
                    {errors.answer3 && touched.answer3 ? (
                      <div className={s.formControl}>{errors.answer3}</div>
                    ) : null}
                    <Field
                      className={s.regInputTest}
                      placeholder="Введите четвертый вариант ответа"
                      name="answer4"
                    />
                    {errors.answer4 && touched.answer4 ? (
                      <div className={s.formControl}>{errors.answer4}</div>
                    ) : null}
                    <Field
                      className={s.regInputTest}
                      placeholder="Введите номер правильного варианта ответа"
                      name="correct_answer"
                      type="number"
                    />
                    {errors.correct_answer && touched.correct_answer ? (
                      <div className={s.formControl}>
                        {errors.correct_answer}
                      </div>
                    ) : null}
                    <Field
                      className={s.regInputTest}
                      placeholder="Введите количество баллов за правильный ответ"
                      name="score"
                      type="number"
                    />
                    {errors.score && touched.score ? (
                      <div className={s.formControl}>{errors.score}</div>
                    ) : null}
                    <button disabled={isFetching} type="submit">
                      Сохранить тест
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};
