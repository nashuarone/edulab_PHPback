import {
  getCurrentCourseAPI,
  updateCourseAPI,
  addUserCourseAPI,
  deleteUserCourseAPI,
  addCourseChapterAPI,
  getAllChaptersAPI,
  getChapterAPI,
  addChapterTestAPI,
  getAllChapterTestsAPI,
  addTestAnswerAPI,
  getMyCoursesAPI,
} from "../api/api";

const ADD_COURSE = "ADD_COURSE";
const UPDATE_COURSE = "UPDATE_COURSE";
const SET_CURRENT_COURSE = "SET_CURRENT_COURSE";
const GET_COURSES = "GET_COURSES";
const GET_MY_COURSES = "GET_MY_COURSES";
const SET_USER_COURSE = "SET_USER_COURSE";
const SET_COURSE_CHAPTER = "SET_COURSE_CHAPTER";
const SET_ALL_CHAPTERS = "SET_ALL_CHAPTERS";
const SET_CHAPTER = "SET_CHAPTER";
const SET_TEST = "SET_TEST";
const SET_ALL_TESTS = "SET_ALL_TESTS";
const SET_ANSWER = "SET_ANSWER";
const UNSET_USER_COURSE = "UNSET_USER_COURSE";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

let initialState = {
  coursesData: [
    // {
    //   id: 1,
    //   title: "JavaScript. Уровень 1",
    //   description:
    //     "Данный курс предназначен для тех, кто уже знаком с принципами HTML-вёрстки и созданием статичных страниц. Практические знания и навыки, приобретённые на этом уровне, дают возможность работать и создавать динамические веб-страницы и приложения. Курс систематизирует знания студентов, которые уже сталкивались с JavaScript, но не имеют богатого опыта работы с языком Студенты знакомятся с основами создания интерактивных веб-страниц с помощью языка JavaScript. Полученные на уроках знания закрепляются через практическую часть - реализация игр на языке JavaScript. Перед началом обучения рекомендуется пройти курсы «Основы программирования» и HTML/CSS",
    //   courseImg:
    //     "https://st2.depositphotos.com/1350793/8441/i/600/depositphotos_84415820-stock-photo-hand-drawing-online-courses-concept.jpg",
    //   format: "Онлайн-курс",
    //   duration: "3 месяца",
    //   lessionsCount: "Массив уроков, который посчитать и вывести где нужно",
    //   price: "1000",
    //   howCompetences: [],
    //   whatYouGet: [],
    //   rating: "",
    //   teachers: [],
    //   program: [],
    //   comments: [],
    //   videoLink: "",
    //   creator: "",
    //   eduFiles: [],
    // },
  ],
  myCoursesData: [],
  currentCourseData: {},
  courseChaptersData: [],
  currentChapterData: {},
  testsData: [],
  answersData: [],
  newPostText: "Pupiiiiiiii",
  newNameText: "",
  isFetching: false,
};

const coursesReducer = (state_c = initialState, action) => {
  switch (action.type) {
    case ADD_COURSE: {
      return {
        ...state_c,
        coursesData: [...state_c.coursesData, action.course],
      };
    }
    case UPDATE_COURSE: {
      return {
        ...state_c,
        coursesData: [
          state_c.coursesData.map((it) =>
            it.id === action.course.id ? action.course : it
          ),
        ],
      };
    }
    case SET_CURRENT_COURSE: {
      return {
        ...state_c,
        currentCourseData: { ...action.course },
      };
    }
    case GET_COURSES: {
      return {
        ...state_c,
        coursesData: [...action.courses],
      };
    }
    case GET_MY_COURSES: {
      return {
        ...state_c,
        myCoursesData: [
          ...action.myCoursesIdArr.map(
            (rewriteItem) =>
              state_c.coursesData.filter(
                (myCourses) => myCourses.id === rewriteItem.course_id
              )[0]
          ),
        ],
      };
    }
    case SET_USER_COURSE: {
      return {
        ...state_c,
        myCoursesData: [
          ...state_c.coursesData.filter((it) => it.id === action.courseId),
        ],
      };
    }
    case UNSET_USER_COURSE: {
      return {
        ...state_c,
        myCoursesData: [
          ...state_c.myCoursesData.filter((it) => it.id !== action.courseId),
        ],
      };
    }
    case SET_COURSE_CHAPTER: {
      return {
        ...state_c,
        courseChaptersData: [...state_c.courseChaptersData, action.chapter],
      };
    }
    case SET_ALL_CHAPTERS: {
      return {
        ...state_c,
        courseChaptersData: [...action.chapters],
      };
    }
    case SET_CHAPTER: {
      return {
        ...state_c,
        currentChapterData: { ...action.chapter },
      };
    }
    case SET_TEST: {
      return {
        ...state_c,
        testsData: [...state_c.testsData, action.test],
      };
    }
    case SET_ALL_TESTS: {
      return {
        ...state_c,
        testsData: [...action.tests],
      };
    }
    case SET_ANSWER: {
      return {
        ...state_c,
        answersData: [...state_c.answersData, action.answer],
      };
    }
    case TOGGLE_IS_FETCHING:
      return {
        ...state_c,
        isFetching: action.fetchingStatus,
      };
    default:
      return state_c;
  }
};

export const addCourse = (course) => ({ type: ADD_COURSE, course });
export const setUpdateCourse = (course) => ({ type: UPDATE_COURSE, course });
export const setCurrentCourse = (course) => ({ type: SET_CURRENT_COURSE, course });
export const getAllCourses = (courses) => ({ type: GET_COURSES, courses });
export const setMyCourses = (myCoursesIdArr) => ({ type: GET_MY_COURSES, myCoursesIdArr });
export const setUserCourse = (courseId) => ({ type: SET_USER_COURSE, courseId });
export const unsetUserCourse = (courseId) => ({ type: UNSET_USER_COURSE, courseId });
export const toggleIsFetching = (fetchingStatus) => ({ type: TOGGLE_IS_FETCHING, fetchingStatus });
export const setCourseChapter = (chapter) => ({ type: SET_COURSE_CHAPTER, chapter });
export const setAllChapters = (chapters) => ({ type: SET_ALL_CHAPTERS, chapters });
export const setChapter = (chapter) => ({ type: SET_CHAPTER, chapter });
export const setTest = (test) => ({ type: SET_TEST, test });
export const setAllTests = (tests) => ({ type: SET_ALL_TESTS, tests });
export const setAnswer = (answer) => ({ type: SET_ANSWER, answer });

export const updateCourse = (
  courseId,
  title,
  img,
  description,
  format,
  duration,
  value
) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    updateCourseAPI(
      courseId,
      title,
      img,
      description,
      format,
      duration,
      value
    ).then((data) => {
      dispatch(toggleIsFetching(false));
      dispatch(setUpdateCourse(data));
      console.log(data);
    });
  };
};
export const addUserCourse = (courseId, userId) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    addUserCourseAPI(courseId, userId).then((data) => {
      dispatch(toggleIsFetching(false));
      dispatch(setUserCourse(courseId));
      console.log(data);
    });
  };
};
export const getCurrentCourse = (courseId) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    getCurrentCourseAPI(courseId).then((data) => {
      dispatch(toggleIsFetching(false));
      dispatch(setCurrentCourse(data));
      console.log(data);
    });
  };
};
export const deleteUserCourse = (courseId, userId) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    deleteUserCourseAPI(courseId, userId).then((data) => {
      debugger;
      dispatch(toggleIsFetching(false));
      dispatch(unsetUserCourse(data.course_id));
      console.log(data);
    });
  };
};
export const getMyCourse = (userId) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    getMyCoursesAPI(userId).then((myCoursesIdArr) => {
      dispatch(toggleIsFetching(false));
      dispatch(setMyCourses(myCoursesIdArr));
      console.log(myCoursesIdArr);
    });
  };
};
export const addCourseChapter = (courseId, title, content) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    addCourseChapterAPI(courseId, title, content).then((chapter) => {
      dispatch(toggleIsFetching(false));
      dispatch(setCourseChapter(chapter));
      console.log(chapter);
    });
  };
};
export const getAllChapters = (courseId) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    getAllChaptersAPI(courseId).then((chapters) => {
      dispatch(toggleIsFetching(false));
      dispatch(setAllChapters(chapters));
      console.log(chapters);
    });
  };
};
export const getChapter = (courseId, chapterId) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    getChapterAPI(courseId, chapterId).then((chapter) => {
      dispatch(toggleIsFetching(false));
      dispatch(setChapter(chapter));
      console.log(chapter);
    });
  };
};
export const addChapterTest = (
  courseId,
  chapterId,
  question,
  answer1,
  answer2,
  answer3,
  answer4,
  correct_answer,
  score
) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    addChapterTestAPI(
      courseId,
      chapterId,
      question,
      answer1,
      answer2,
      answer3,
      answer4,
      correct_answer,
      score
    ).then((test) => {
      dispatch(toggleIsFetching(false));
      dispatch(setTest(test));
      console.log(test);
    });
  };
};
export const getAllChapterTests = (courseId, chapterId) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    getAllChapterTestsAPI(courseId, chapterId).then((tests) => {
      dispatch(toggleIsFetching(false));
      dispatch(setAllTests(tests));
      console.log(tests);
    });
  };
};
export const addTestAnswer = (testId, answerNum) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    addTestAnswerAPI(testId, answerNum).then((answer) => {
      dispatch(toggleIsFetching(false));
      dispatch(setAnswer(answer));
      console.log(answer);
    });
  };
};

export default coursesReducer;
