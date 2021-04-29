import { addUserCourseAPI, deleteUserCourseAPI } from "../api/api";

const ADD_COURSE = "ADD_COURSE";
const GET_COURSES = "GET_COURSES";
const GET_MY_COURSES = "GET_MY_COURSES";
const SET_USER_COURSE = "SET_USER_COURSE";
const UNSET_USER_COURSE = "UNSET_USER_COURSE";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
//const UPDATE_COURSE = "UPDATE_COURSE";

let initialState = {
  coursesData: [
    {
      id: 0,
      creator_id: 0,
      title: "JavaScript. Уровень 1",
      description:
        "Данный курс предназначен для тех, кто уже знаком с принципами HTML-вёрстки и созданием статичных страниц. Практические знания и навыки, приобретённые на этом уровне, дают возможность работать и создавать динамические веб-страницы и приложения. Курс систематизирует знания студентов, которые уже сталкивались с JavaScript, но не имеют богатого опыта работы с языком Студенты знакомятся с основами создания интерактивных веб-страниц с помощью языка JavaScript. Полученные на уроках знания закрепляются через практическую часть - реализация игр на языке JavaScript. Перед началом обучения рекомендуется пройти курсы «Основы программирования» и HTML/CSS",
      img:
        "https://st2.depositphotos.com/1350793/8441/i/600/depositphotos_84415820-stock-photo-hand-drawing-online-courses-concept.jpg",
      format: 1,
      duration: 0,
      rating: 1,
      checked: true,
      value: 0,
      themes: [
        {
          id: 0,
          title: "string",
        },
      ],
    },
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
  myCoursesData: [
    {
      id: 10,
      creator_id: 0,
      title: "JavaScript. Уровень 100",
      description:
        "Данный курс предназначен для тех, кто уже знаком с принципами HTML-вёрстки и созданием статичных страниц. Практические знания и навыки, приобретённые на этом уровне, дают возможность работать и создавать динамические веб-страницы и приложения. Курс систематизирует знания студентов, которые уже сталкивались с JavaScript, но не имеют богатого опыта работы с языком Студенты знакомятся с основами создания интерактивных веб-страниц с помощью языка JavaScript. Полученные на уроках знания закрепляются через практическую часть - реализация игр на языке JavaScript. Перед началом обучения рекомендуется пройти курсы «Основы программирования» и HTML/CSS",
      img:
        "https://st2.depositphotos.com/1350793/8441/i/600/depositphotos_84415820-stock-photo-hand-drawing-online-courses-concept.jpg",
      format: 1,
      duration: 0,
      rating: 1,
      checked: true,
      value: 0,
      themes: [
        {
          id: 0,
          title: "string",
        },
      ],
    },
  ],
  currentCourseData: {
    id: 0,
    creator_id: 0,
    title: "JavaScript. Уровень 10",
    description:
      "Данный курс предназначен для тех, кто уже знаком с принципами HTML-вёрстки и созданием статичных страниц.",
    img:
      "https://st2.depositphotos.com/1350793/8441/i/600/depositphotos_84415820-stock-photo-hand-drawing-online-courses-concept.jpg",
    format: 1,
    duration: 0,
    rating: 1,
    checked: true,
    value: 0,
    themes: [
      {
        id: 0,
        title: "string",
      },
    ],
  },
  newPostText: "Pupiiiiiiii",
  newNameText: "",
};

const coursesReducer = (state_c = initialState, action) => {
  switch (action.type) {
    case ADD_COURSE: {
      return {
        ...state_c,
        coursesData: [...state_c.coursesData, action.course],
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
    default:
      return state_c;
  }
};

export const addCourse = (course) => ({ type: ADD_COURSE, course });
export const getAllCourses = (courses) => ({ type: GET_COURSES, courses });
export const getMyCourses = (myCoursesIdArr) => ({ type: GET_MY_COURSES, myCoursesIdArr });
export const setUserCourse = (courseId) => ({
  type: SET_USER_COURSE,
  courseId,
});
export const unsetUserCourse = (courseId) => ({
  type: UNSET_USER_COURSE,
  courseId,
});
export const toggleIsFetching = (fetchingStatus) => ({
  type: TOGGLE_IS_FETCHING,
  fetchingStatus,
});

export const addUserCourse = (courseId, userId) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    addUserCourseAPI(courseId, userId).then((data) => {
      debugger
      dispatch(toggleIsFetching(false));
      dispatch(setUserCourse(courseId));
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

export default coursesReducer;
