const ADD_NEWS = "ADD_NEWS";
const GET_NEWS = "GET_NEWS";
const CREATE_NEWS = "CREATE_NEWS";
//const DELETE_COURSE = "DELETE_COURSE";
//const UPDATE_COURSE = "UPDATE_COURSE";

let initialState = {
  newsData: [
    {
      id: 1,
      title: "С запуском!",
      description:
        "15 мая состоялся релиз проекта 'eduLab'. Несмотря на то, что первый камень на фундамент проекта был заложен всего лишь в феврале, наша команда смогла за короткие сроки собрать и запусить рабочую версию продукта. Поздравляем!",
      newsImg:
        "https://dikiy.pro/img/blog/primary-features-of-start-meeting-before-start-of-project.jpg",
      videoLink: "",
    },
    {
      id: 2,
      title: "Нас уже 5!!!",
      description:
        "Количество пользователей нашей системы пробило отметку в пять пользователей! Сбасибо за интерес к нашему продукту и желаем приятных впечатлений и удачи в развитии =)",
      newsImg: "https://i.ytimg.com/vi/CUXrW1m8Yb4/maxresdefault.jpg",
      videoLink: "",
    },
    // {
    //   id: 2,
    //   title: "Нас уже 5!!!",
    //   description:
    //     "Количество пользователей нашей системы пробило отметку в пять пользователей! Сбасибо за интерес к нашему продукту и желаем приятных впечатлений и удачи в развитии =)",
    //   newsImg: "https://st2.depositphotos.com/1350793/8441/i/600/depositphotos_84415820-stock-photo-hand-drawing-online-courses-concept.jpg",
    //   videoLink: "",
    // },
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
    case CREATE_NEWS: {
      return {
        ...state_c,
        newsData: [
          ...state_c.newsData,
          {...action.news, id: state_c.newsData.length + 1},
        ],
      };
    }
    default:
      return state_c;
  }
}

export const addNews = (news) => ({ type: ADD_NEWS, news });
export const getAllNews = (newses) => ({ type: GET_NEWS, newses });

export const createNews = (title, newsImg, description) => ({
  type: CREATE_NEWS,
  news: { title, newsImg, description },
});

export default newsReducer;
