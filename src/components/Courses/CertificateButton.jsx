import React from "react";
//import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import s from "./Courses.module.css";
//import { getCourseProgress } from "../../redux/coursesReducer";

const CertificateButton = (props) => {
  //.filter((it) => it.course_id === props.courseId)[0]
  //const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getCourseProgress(props.courseId));
  // }, [dispatch, props.courseId]);
  // const progressArr = useSelector((s) => s.coursesPage.courseProgress);
  const [progress] = props.progress.filter(
    (it) => it.course_id === props.courseId
  );
  return (
    <div>
      <NavLink to={"/mycourse/certificate/" + props.courseId}>
        <button
          disabled={progress ? progress.score <= ((progress.max_score * 9) / 10) : true}
          className={s.courseBtn}
        >
          Сертификат об окончании курса
        </button>
      </NavLink>
    </div>
  );
};
export default CertificateButton;
