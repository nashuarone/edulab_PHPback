import {
  deleteCourseAPI,
  getCurrentCourseAPI,
  updateCourseAPI,
  addUserCourseAPI,
  deleteUserCourseAPI,
  addCourseChapterAPI,
  getAllChaptersAPI,
  getChapterAPI,
  addChapterTestAPI,
  deleteChapterTestAPI,
  editChapterTestAPI,
  getAllChapterTestsAPI,
  addTestAnswerAPI,
  getMyCoursesAPI,
  addCourseThemeAPI,
  getAllCourseThemesAPI,
  createThemeAPI,
  getAllThemesAPI,
  getCurrentThemeAPI,
  getCourseProgressAPI,
  getAllCourseProgressAPI,
  deleteCourseChapterAPI,
  getFilteredCoursesAPI,
  deleteThemeAPI,
} from "../api/api";

const ADD_COURSE = "ADD_COURSE";
const KICK_COURSE = "KICK_COURSE";
const UPDATE_COURSE = "UPDATE_COURSE";
const SET_CURRENT_COURSE = "SET_CURRENT_COURSE";
const GET_COURSES = "GET_COURSES";
const GET_MY_COURSES = "GET_MY_COURSES";
const SET_USER_COURSE = "SET_USER_COURSE";
const SET_COURSE_CHAPTER = "SET_COURSE_CHAPTER";
const UNSET_COURSE_CHAPTER = "UNSET_COURSE_CHAPTER";
const SET_ALL_CHAPTERS = "SET_ALL_CHAPTERS";
const SET_CHAPTER = "SET_CHAPTER";
const SET_TEST = "SET_TEST";
const EDIT_TEST = "EDIT_TEST";
const DELETE_TEST = "DELETE_TEST";
const SET_ALL_TESTS = "SET_ALL_TESTS";
const SET_ANSWER = "SET_ANSWER";
const CREATE_THEME = "CREATE_THEME";
const SET_ALL_COMMON_THEMES = "SET_ALL_COMMON_THEMES";
const SET_THEME = "SET_THEME";
const UNSET_COMMON_THEME = "UNSET_COMMON_THEME";
const SET_ALL_THEMES = "SET_ALL_THEMES";
const SET_CURRENT_THEME = "SET_CURRENT_THEME";
const SET_COURSE_PROGRESS = "SET_COURSE_PROGRESS";
const SET_CURRENT_COURSE_PROGRESS = "SET_CURRENT_COURSE_PROGRESS";
const UNSET_USER_COURSE = "UNSET_USER_COURSE";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

let initialState = {
  coursesData: [],
  myCoursesData: [],
  currentCourseData: {},
  courseChaptersData: [],
  currentChapterData: {},
  testsData: [],
  answersData: [],
  themesData: [],
  allThemesData: [],
  currentTheme: {},
  currentCourseProgress: {},
  courseProgress: [],
  newPostText: "Pupiiiiiiii",
  newNameText: "",
  isFetching: false,
};

const coursesReducer = (state_c = initialState, action) => {
  switch (action.type) {
    case ADD_COURSE: {
      return {
        ...state_c,
        coursesData: [action.course, ...state_c.coursesData],
      };
    }
    case KICK_COURSE: {
      return {
        ...state_c,
        coursesData: [
          state_c.coursesData.filter((it) => it.course_id !== action.courseId),
        ],
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
        currentCourseData: action.course,
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
    case UNSET_COURSE_CHAPTER: {
      return {
        ...state_c,
        courseChaptersData: [
          state_c.courseChaptersData.filter((it) => it.id !== action.chapterId),
        ],
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
    case DELETE_TEST: {
      return {
        ...state_c,
        testsData: [state_c.testsData.filter((it) => it.id !== action.testId)],
      };
    }
    case EDIT_TEST: {
      return {
        ...state_c,
        testsData: [
          state_c.testsData.map((it) =>
            action.test.id === it.id ? action.test : it
          ),
        ],
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
        answersData: [
          state_c.answersData.filter((it) => it.id !== action.answer.id),
          action.answer,
        ],
      };
    }
    case CREATE_THEME: {
      return {
        ...state_c,
        allThemesData: [...state_c.allThemesData, action.theme],
      };
    }
    case SET_ALL_COMMON_THEMES: {
      return {
        ...state_c,
        allThemesData: [...action.themes],
      };
    }
    case UNSET_COMMON_THEME: {
      return {
        ...state_c,
        allThemesData: state_c.allThemesData.filter((it) => it.id !== action.themeId),
      };
    }
    case SET_THEME: {
      return {
        ...state_c,
        themesData: [...state_c.themesData, action.theme],
      };
    }
    case SET_ALL_THEMES: {
      return {
        ...state_c,
        themesData: [...action.themes],
      };
    }
    case SET_CURRENT_THEME: {
      return {
        ...state_c,
        currentTheme: action.currentTheme,
      };
    }
    case SET_COURSE_PROGRESS: {
      return {
        ...state_c,
        courseProgress: [...action.progresses],
      };
    }
    case SET_CURRENT_COURSE_PROGRESS: {
      return {
        ...state_c,
        currentCourseProgress: { ...action.progress },
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
export const kickCourse = (courseId) => ({ type: KICK_COURSE, courseId });
export const setUpdateCourse = (course) => ({ type: UPDATE_COURSE, course });
export const setCurrentCourse = (course) => ({ type: SET_CURRENT_COURSE, course });
export const getAllCourses = (courses) => ({ type: GET_COURSES, courses });
export const setMyCourses = (myCoursesIdArr) => ({ type: GET_MY_COURSES, myCoursesIdArr });
export const setUserCourse = (courseId) => ({ type: SET_USER_COURSE, courseId });
export const unsetUserCourse = (courseId) => ({ type: UNSET_USER_COURSE, courseId });
export const toggleIsFetching = (fetchingStatus) => ({ type: TOGGLE_IS_FETCHING, fetchingStatus });
export const setCourseChapter = (chapter) => ({ type: SET_COURSE_CHAPTER, chapter });
export const unsetCourseChapter = (chapterId) => ({ type: UNSET_COURSE_CHAPTER, chapterId });
export const setAllChapters = (chapters) => ({ type: SET_ALL_CHAPTERS, chapters });
export const setChapter = (chapter) => ({ type: SET_CHAPTER, chapter });
export const setTest = (test) => ({ type: SET_TEST, test });
export const deleteTest = (testId) => ({ type: DELETE_TEST, testId });
export const changeTest = (test) => ({ type: EDIT_TEST, test });
export const setAllTests = (tests) => ({ type: SET_ALL_TESTS, tests });
export const setAnswer = (answer) => ({ type: SET_ANSWER, answer });
export const setCreatedTheme = (theme) => ({ type: CREATE_THEME, theme });
export const setAllCommonThemes = (themes) => ({ type: SET_ALL_COMMON_THEMES, themes });
export const setTheme = (theme) => ({ type: SET_THEME, theme });
export const unsetCommonTheme = (themeId) => ({ type: UNSET_COMMON_THEME, themeId });
export const setCurrentTheme = (currentTheme) => ({ type: SET_CURRENT_THEME, currentTheme });
export const setAllThemes = (themes) => ({ type: SET_ALL_THEMES, themes });
export const setCourseProgress = (progresses) => ({ type: SET_COURSE_PROGRESS, progresses });
export const setCurrentCourseProgress = (progress) => ({ type: SET_CURRENT_COURSE_PROGRESS, progress });

export const getFilteredCourses = (themeId) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    getFilteredCoursesAPI(themeId).then((data) => {
      dispatch(toggleIsFetching(false));
      dispatch(getAllCourses(data));
      console.log(data);
    });
  };
};
export const deleteCourse = (courseId) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    deleteCourseAPI(courseId).then((data) => {
      dispatch(toggleIsFetching(false));
      dispatch(kickCourse(courseId));
      console.log(data);
    });
  };
};
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
      dispatch(setCurrentCourse({}));
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
      dispatch(toggleIsFetching(false));
      dispatch(unsetUserCourse(courseId));
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
export const deleteCourseChapter = (courseId, chapterId) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    deleteCourseChapterAPI(courseId, chapterId).then((ok) => {
      debugger
      dispatch(toggleIsFetching(false));
      dispatch(unsetCourseChapter(chapterId));
      console.log(ok);
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
export const deleteChapterTest = (
  courseId,
  chapterId,
  testId,
) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    deleteChapterTestAPI(courseId, chapterId, testId).then((test) => {
      dispatch(toggleIsFetching(false));
      dispatch(deleteTest(testId));
      console.log(test);
    });
  };
};
export const editChapterTest = (
  courseId,
  chapterId,
  testId,
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
    editChapterTestAPI(
      courseId,
      chapterId,
      testId,
      question,
      answer1,
      answer2,
      answer3,
      answer4,
      correct_answer,
      score
    ).then((test) => {
      dispatch(toggleIsFetching(false));
      dispatch(changeTest(test));
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
export const createTheme = (theme) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    createThemeAPI(theme).then((theme) => {
      dispatch(toggleIsFetching(false));
      dispatch(setCreatedTheme(theme));
      console.log(theme);
    });
  };
};
export const deleteTheme = (themeId) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    deleteThemeAPI(themeId).then((ok) => {
      dispatch(toggleIsFetching(false));
      dispatch(unsetCommonTheme(themeId));
      console.log(ok);
    });
  };
};
export const getAllThemes = () => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    getAllThemesAPI().then((themes) => {
      dispatch(toggleIsFetching(false));
      dispatch(setAllCommonThemes(themes));
      console.log(themes);
    });
  };
};
export const getCurrentTheme = (themeId) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    getCurrentThemeAPI(themeId).then((themeObj) => {
      dispatch(toggleIsFetching(false));
      dispatch(setCurrentTheme(themeObj));
      console.log(themeObj);
    });
  };
};
export const addCourseTheme = (courseId, theme) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    addCourseThemeAPI(courseId, theme).then((theme) => {
      dispatch(toggleIsFetching(false));
      dispatch(setTheme(theme));
      console.log(theme);
    });
  };
};
export const getAllCourseThemes = (courseId) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    getAllCourseThemesAPI(courseId).then((themes) => {
      dispatch(toggleIsFetching(false));
      dispatch(setAllThemes(themes));
      console.log(themes);
    });
  };
};
export const getCourseProgress = (courseIdArr) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    getAllCourseProgressAPI(courseIdArr).then((progressArr) => {
      dispatch(toggleIsFetching(false));
      dispatch(setCourseProgress(progressArr));
      console.log(progressArr);
    });
  };
};
export const getCurrentCourseProgress = (courseId) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    getCourseProgressAPI(courseId).then((progressArr) => {
      dispatch(toggleIsFetching(false));
      dispatch(setCurrentCourseProgress(progressArr[0]));
      console.log(progressArr);
    });
  };
};

export default coursesReducer;
