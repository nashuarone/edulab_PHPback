import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllChapterTests, addTestAnswer } from "../../../../redux/coursesReducer";
import s from "./TestItem.module.css";

const TestItem = (props) => {
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
  }, [dispatch, courseId, chapterId, answersData.length]);
  return (
    <div className={s.testBlock}>
      {testsData.length > 0
        ? testsData.map((test) => (
            <div key={test.id}>
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
                {answersData.filter((it) => it.test_id === test.id) > 0 ? (
                  answersData
                    .filter((it) => it.test_id === test.id)
                    .map((answerItem) => (
                      <div key={answerItem.id}>
                        {answerItem.correct === true ? (
                          <span className={s.greenAnswer}>Правильно</span>
                        ) : (
                          <span className={s.redAnswer}>Ответ неверный</span>
                        )}
                      </div>
                    ))
                ) : (
                  <span className={s.needAnswer}>Тест не пройден</span>
                )}
              </div>
            </div>
          ))
        : "Глава не содержит тестов"}
    </div>
  );
};

export default TestItem
