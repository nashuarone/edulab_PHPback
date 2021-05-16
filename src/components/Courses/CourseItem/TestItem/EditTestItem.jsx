import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addChapterTest } from "../../../../redux/coursesReducer";
import s from "../../Courses.module.css";

const EditTestItem = (props) => {
  const courseId = props.courseId;
  const chapterId = props.chapterId;
  const dispatch = useDispatch();
  const [question, setQuestion] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [answer4, setAnswer4] = useState("");
  const [correct_answer, setCorrectAnswer] = useState("");
  const [score, setScore] = useState("");
  const handlleChangeQ = (e) => {
    setQuestion(e.target.value);
  };
  const handlleChangeA1 = (e) => {
    setAnswer1(e.target.value);
  };
  const handlleChangeA2 = (e) => {
    setAnswer2(e.target.value);
  };
  const handlleChangeA3 = (e) => {
    setAnswer3(e.target.value);
  };
  const handlleChangeA4 = (e) => {
    setAnswer4(e.target.value);
  };
  const handlleChangeAC = (e) => {
    setCorrectAnswer(e.target.value);
  };
  const handlleChangeS = (e) => {
    setScore(e.target.value);
  };
  return (
    <div className={s.coursesPage}>
      <div className={s.editBlockTitle}>Редактор тестов для глав</div>
      <div>
        <div className={s.editBlock}>
          <div>Добавить вопрос и варианты ответов для теста</div>
          <div className={s.newCourseBlock}>
            <div>
              <textarea
                className={s.regInputTest}
                value={question}
                onChange={handlleChangeQ}
                type="text"
                placeholder="Введите вопрос для теста"
              />
            </div>
            <div>
              <input
                className={s.regInputTest}
                value={answer1}
                onChange={handlleChangeA1}
                type="text"
                placeholder="Введите первый вариант ответа"
              />
            </div>
            <div>
              <input
                className={s.regInputTest}
                value={answer2}
                onChange={handlleChangeA2}
                type="text"
                placeholder="Введите второй вариант ответа"
              />
            </div>
            <div>
              <input
                className={s.regInputTest}
                value={answer3}
                onChange={handlleChangeA3}
                type="text"
                placeholder="Введите третий вариант ответа"
              />
            </div>
            <div>
              <input
                className={s.regInputTest}
                value={answer4}
                onChange={handlleChangeA4}
                type="text"
                placeholder="Введите четвертый вариант ответа"
              />
            </div>
            <div>
              <input
                className={s.regInputTest}
                value={correct_answer}
                onChange={handlleChangeAC}
                type="number"
                placeholder="Введите номер правильного варианта ответа"
              />
            </div>
            <div>
              <input
                className={s.regInputTest}
                value={score}
                onChange={handlleChangeS}
                type="number"
                placeholder="Введите количество баллов за правильный ответ"
              />
            </div>
            <button
              onClick={() =>
                dispatch(
                  addChapterTest(
                    courseId,
                    chapterId,
                    question,
                    answer1,
                    answer2,
                    answer3,
                    answer4,
                    +correct_answer,
                    score
                  )
                )
              }
            >
              Сохранить тест
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTestItem;
