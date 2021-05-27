import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import EditNews from "./EditNews";
import s from "./Courses.module.css";
import { deleteNews, getAllNews } from "../../redux/newsReducer";

const News = (props) => {
  const isAdmin = useSelector((s) => s.profilePage.isAdminos);
  const newsData = useSelector((s) => s.newsPage.newsData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllNews(newsData));
    // eslint-disable-next-line
  }, [dispatch, newsData.length]);
  return (
    <div className={s.coursesPage}>
      <div className={s.editBlockTitle}>Новости</div>
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
              <span>
                <button onClick={() => dispatch(deleteNews(c.id))}>
                  Удалить новость
                </button>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
