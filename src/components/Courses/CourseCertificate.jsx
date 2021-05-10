import React, { useEffect, useRef } from "react";
import { compose } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { getCurrentCourse } from "../../redux/coursesReducer";
import s from "./Courses.module.css";

const CourseCertificate = (props) => {
  const currentLearner = useSelector((s) => s.profilePage.profileData);
  let genderText = currentLearner.gender === 2 ? "прошла" : "прошел"
  let courseId = props.match.params.courseId;
  const currentCourseData = useSelector((s) => s.coursesPage.currentCourseData);
  const inputRef = useRef(null);
  const printDocument = () => {
    html2canvas(inputRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0, 210, 148);
      pdf.save("download.pdf");
    });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentCourse(courseId));
  }, [dispatch, courseId]);
  return (
    <>
      <div className={s.coursesPage}>
        <div className="mb5">
          <button className={s.courseBtn} onClick={printDocument}>
            Скачать сертификат
          </button>
        </div>
        <div className={s.certifImg} id="divToPrint" ref={inputRef}>
          <div className={s.certifInto}>
            <div className={s.certifTitle}>Сертификат</div>
            <div>о том, что</div>
            <div>
              {currentLearner.second_name} {currentLearner.first_name}
            </div>
            <div>{genderText} курс</div>
            <div>{currentCourseData.title}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default compose(withRouter)(CourseCertificate);
