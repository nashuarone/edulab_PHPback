const ADD_COURSE = "ADD_COURSE";
const GET_COURSES = "GET_COURSES";
//const DELETE_COURSE = "DELETE_COURSE";
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
    default:
      return state_c;
  }
}

export const addCourse = (course) => ({ type: ADD_COURSE, course });
export const getAllCourses = (courses) => ({ type: GET_COURSES, courses });

export default coursesReducer;
