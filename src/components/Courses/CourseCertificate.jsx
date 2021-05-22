import React, { useEffect, useRef } from "react";
import { compose } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import {
  getCurrentCourse,
  getCurrentCourseProgress,
} from "../../redux/coursesReducer";
import s from "./Courses.module.css";
import pic from "../../assets/images/certifSign.png";
import logo from "../../assets/images/flowers-logo-png-6.png";

const CourseCertificate = (props) => {
  const currentLearner = useSelector((s) => s.profilePage.profileData);
  let genderText = currentLearner.gender === 2 ? "окончила" : "окончил";
  let courseId = props.match.params.courseId;
  const currentCourseData = useSelector((s) => s.coursesPage.currentCourseData);
  const inputRef = useRef(null);
  const printDocument = () => {
    html2canvas(inputRef.current).then((canvas) => {
     const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "mm", "a5");
      pdf.addImage(imgData, "PNG", -5, 0, 215, 148);
      pdf.save("download.pdf");
    });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentCourse(courseId));
  }, [dispatch, courseId]);
  useEffect(() => {
    dispatch(getCurrentCourseProgress(courseId));
  }, [dispatch, courseId]);
  const progress = useSelector((s) => s.coursesPage.currentCourseProgress);
  return (
    <>
      <div className={s.coursesPage}>
        <div className="mb5">
          <button className={s.certificateBtn} onClick={printDocument}>
            Скачать сертификат
          </button>
        </div>
        <div className={s.certifImg} id="divToPrint" ref={inputRef}>
          <div className={s.certifInto}>
            <div className={s.certifLogo}>
              <img src={logo} alt="default-logo" />
            </div>
            <div className={s.certifLogoTitle}>eduLab</div>
            <div className={s.certifTitle}>Сертификат</div>
            <div className={s.certifItalic}>свидетельствует о том, что</div>
            <div className={s.certifName}>
              {currentLearner.second_name} {currentLearner.first_name}
            </div>
            <div className={s.certifItalic}>{genderText} курс</div>
            <div>
              <i className="fas fa-angle-double-left"></i>{" "}
              {currentCourseData.title}{" "}
              <i className="fas fa-angle-double-right"></i>
            </div>
            <div className={s.certifItalic}>
              набрав {progress.score} баллов из {progress.max_score}
            </div>
            <div className={s.certifSign}>
              <div>Заместитель генерального директора</div>
              <div>
                <img alt="подпись" src={pic} />
              </div>
              <div>Федотов А.С.</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default compose(withRouter)(CourseCertificate);
