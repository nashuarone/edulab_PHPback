import React from "react";
import { useSelector } from "react-redux";
import EditNews from "./EditNews";
import s from "./Courses.module.css";

const News = (props) => {
  const isAdmin = useSelector((s) => s.profilePage.isAdminos);
  const newsData = useSelector((s) => s.newsPage.newsData);
  //const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getAllNewsAPI());
  // }, [dispatch]);
  return (
    <div className={s.coursesPage}>
      <div>Новости</div>
      {isAdmin && (
        <div className={s.editModeRed}>
          <EditNews props={props} />
        </div>
      )}
      <div>
        {newsData.map((c) => (
          <div className={s.courseItem} key={c.id}>
            <div className={s.coursePicture}>
              <img alt="pic" src={c.newsImg} />
            </div>
            <div className={s.descriptionItem}>
              <span className={s.tittleDecor}>{c.title}</span>
              <div className={s.courseDescription}>{c.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
