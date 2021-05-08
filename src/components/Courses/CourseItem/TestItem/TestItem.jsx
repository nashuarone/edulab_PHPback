import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllChapterTests, addTestAnswer } from "../../../../redux/coursesReducer";

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
  }, [dispatch, courseId, chapterId]);
  return (
    <div>
      {testsData.length > 0
        ? testsData.map((test) => (
            <div key={test.id}>
              <div>
                <div>{test.question}</div>
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
                  onClick={() => dispatch(addTestAnswer(test.id, answerNum))}
                >
                  Отправить ответ
                </button>
              </div>
              <div>
                {answersData.filter((it) => it.test_id === test.id) > 0
                  ? answersData
                      .filter((it) => it.test_id === test.id)
                      .map((answerItem) => (
                        <div key={answerItem.test_id}>
                          {answerItem.correct === true ? (
                            <span>Правильно</span>
                          ) : (
                            <span>Ответ неверный</span>
                          )}
                        </div>
                      ))
                  : "Тест не пройден"}
              </div>
            </div>
          ))
        : "Глава не содержит тестов"}
    </div>
  );
};

export default TestItem
