const ADD_NEWS = "ADD_NEWS";
const GET_NEWS = "GET_NEWS";
//const DELETE_COURSE = "DELETE_COURSE";
//const UPDATE_COURSE = "UPDATE_COURSE";

let initialState = {
  newsData: [
    {
      id: 1,
      title: "JavaScript. Уровень 1",
      description:
        "Данный курс предназначен для тех, кто уже знаком с принципами HTML-вёрстки и созданием статичных страниц. Практические знания и навыки, приобретённые на этом уровне, дают возможность работать и создавать динамические веб-страницы и приложения. Курс систематизирует знания студентов, которые уже сталкивались с JavaScript, но не имеют богатого опыта работы с языком Студенты знакомятся с основами создания интерактивных веб-страниц с помощью языка JavaScript. Полученные на уроках знания закрепляются через практическую часть - реализация игр на языке JavaScript. Перед началом обучения рекомендуется пройти курсы «Основы программирования» и HTML/CSS",
      newsImg:
        "https://st2.depositphotos.com/1350793/8441/i/600/depositphotos_84415820-stock-photo-hand-drawing-online-courses-concept.jpg",
      videoLink: "",
    },
    {
      id: 2,
      title: "JavaScript. Уровень 100",
      description:
        "SUPER курс предназначен для тех, кто уже знаком с принципами HTML-вёрстки и созданием статичных страниц. Практические знания и навыки, приобретённые на этом уровне, дают возможность работать и создавать динамические веб-страницы и приложения. Курс систематизирует знания студентов, которые уже сталкивались с JavaScript, но не имеют богатого опыта работы с языком Студенты знакомятся с основами создания интерактивных веб-страниц с помощью языка JavaScript. Полученные на уроках знания закрепляются через практическую часть - реализация игр на языке JavaScript. Перед началом обучения рекомендуется пройти курсы «Основы программирования» и HTML/CSS",
      newsImg:
        "https://st2.depositphotos.com/1350793/8441/i/600/depositphotos_84415820-stock-photo-hand-drawing-online-courses-concept.jpg",
      videoLink: "",
    },
  ],
  newPostText: "Pupiiiiiiii",
  newNameText: "",
};

const newsReducer = (state_c = initialState, action) => {
  switch (action.type) {
    case ADD_NEWS: {
      return {
        ...state_c,
        newsData: [...state_c.newsData, action.news],
      };
    }
    case GET_NEWS: {
      return {
        ...state_c,
        newsData: [...action.newses],
      };
    }
    default:
      return state_c;
  }
}

export const addNews = (news) => ({ type: ADD_NEWS, news });
export const getAllNews = (newses) => ({ type: GET_NEWS, newses });

export default newsReducer;
