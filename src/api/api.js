import axios from 'axios'
import { setLearner } from '../redux/profileReducer'
import { setFiles, addFile, deleteFileAC } from "../redux/fileReducer";
import { addCourse, getAllCourses } from '../redux/coursesReducer';
import { API_URL } from "../config";
import { addNews, getAllNews } from '../redux/newsReducer';

export const registrationAPI = async (email, password, first_name, second_name, birth_date) => {
  //return dispatch => {
    try {
      const response = await axios.post(`${API_URL}user`, {
        email,
        password,
        first_name,
        second_name,
        birth_date,
      });
      //dispatch(setLearner(response.data));
      //alert(JSON.stringify(response.data));
      alert("Вы зарегистрированы, войдите в личный кабинет")
      return response;
    } catch (e) {
      alert(e.response.data.error.message);
    }
  //}
};

export const loginAPI = async (email, password) => {
  //return async dispatch => {
  try {
    debugger;
    const response = await axios.post(`${API_URL}auth/login`, {
      email,
      password,
    });
    //dispatch(setLearner(response.data.user))
    localStorage.setItem("token", response.data.token);
    const user = await axios.get(`${API_URL}user`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    console.log(response.data);
    console.log(user.data);
    return user
  } catch (e) {
    debugger;
    alert(e.response.data.error.message);
  }
  //}
};

export const authAPI = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${API_URL}user`, {headers: {Authorization:`Bearer ${localStorage.getItem('token')}`}}
      );
      dispatch(setLearner(response.data));
      //localStorage.setItem("token", response.data.token);
      console.log(response.data);
    } catch (e) {
      debugger
      //localStorage.removeItem('token')
      alert(e.response.data.error.message);
    }
  };
};

export const uploadAvatarAPI = async (avatar) => {
  //return async (dispatch) => {
    try {
      debugger
      const response = await axios.put(`${API_URL}user`, {avatar},
      {headers: {Authorization:`Bearer ${localStorage.getItem('token')}`}});
      //dispatch(setLearner(response.data));
      //alert(JSON.stringify(response.data));
      return response
    } catch (e) {
      console.log(e)
      alert(e.response.data.error.message);
    }
  //};
};

export const deleteAvatarAPI = async (avatar) => {
  try {
    debugger
    const response = await axios.put(
      `${API_URL}user`,
      { avatar },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    //dispatch(setLearner(response.data));
    alert(JSON.stringify(response.data));
    return response;
  } catch (e) {
    console.log(e);
    alert(e.response.data.error.message);
  }
};

export function getFilesAPI(dirId) {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${API_URL}api/files${dirId ? "?parent=" + dirId : ""}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(setFiles(response.data));
      console.log(response.data);
    } catch (e) {
      alert(e.response.data.message);
    }
  };
}

export function createDirAPI(dirId, name) {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${API_URL}api/files`,
        {
          name,
          parent: dirId,
          type: "dir",
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(addFile(response.data));
      console.log(response.data);
    } catch (e) {
      alert(e.response.data.message);
    }
  };
}

export function uploadFileAPI(file, dirId) {
  return async (dispatch) => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      if (dirId) {
        formData.append('parent', dirId)
      }
      const response = await axios.post(
        `${API_URL}api/files/upload`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          onUploadProgress: (progressEvent) => {
            const totalLength = progressEvent.lengthComputable
              ? progressEvent.total
              : progressEvent.target.getResponseHeader("content-length") ||
                progressEvent.target.getResponseHeader(
                  "x-decompressed-content-length"
                );
            console.log("total", totalLength);
            if (totalLength) {
              let progress = Math.round(
                (progressEvent.loaded * 100) / totalLength
              );
              console.log(progress);
            }
          },
        }
      );
      dispatch(addFile(response.data));
      console.log(response.data);
    } catch (e) {
      alert(e.response.data.message);
    }
  };
}

export const downloadFileAPI = async (file) => {
  const response = await fetch(
    `${API_URL}api/files/download?id=${file._id}`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
  )
  if (response.status === 200) {
    const blob = await response.blob()
    const downloadUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = file.name
    document.body.appendChild(link)
    link.click()
    link.remove()
  }
};

export function deleteFileAPI(file) {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `${API_URL}api/files?id=${file._id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(deleteFileAC(file._id));
      alert(response.data.message);
    } catch (e) {
      alert(e.response.data.message);
    }
  };
}

export function searchFileAPI(search) {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${API_URL}api/files/search?search=${search}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(setFiles(response.data));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
}

export function createCourseAPI(title, img, description, format, duration, value) {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${API_URL}course`,
        {
          title,
          img,
          description,
          format,
          duration,
          value,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(addCourse(response.data));
      console.log(response.data);
    } catch (e) {
      alert(e.response.data.message);
    }
  };
}

export const getCurrentCourseAPI = async (courseId) => {
  try {
    const response = await axios.get(
      `${API_URL}course/${courseId}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    //alert(JSON.stringify(response.data, null, 2));
    console.log(JSON.stringify(response, null, 2));
    return response.data;
  } catch (e) {
    console.log(e);
    alert(e.response.data.error.message);
  }
};

export const updateCourseAPI = async (
  courseId,
  title,
  img,
  description,
  format,
  duration,
  value,
) => {
  try {
    const response = await axios.put(
      `${API_URL}course/${courseId}`,
      { title, img, description, format, duration, value },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    //alert(JSON.stringify(response.data, null, 2));
    console.log(JSON.stringify(response, null, 2));
    return response.data;
  } catch (e) {
    console.log(e);
    alert(e.response.data.error.message);
  }
};

export function getAllCoursesAPI() {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${API_URL}courses`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(getAllCourses(response.data));
      console.log(response.data);
    } catch (e) {
      alert(e.response.data.message);
    }
  };
}

export function createNewsAPI(title, newsImg, description) {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${API_URL}api/news`,
        {
          title,
          newsImg,
          description,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(addNews(response.data));
      console.log(response.data);
    } catch (e) {
      alert(e.response.data.message);
    }
  };
}

export function getAllNewsAPI() {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${API_URL}api/news`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(getAllNews(response.data));
      console.log(response.data);
    } catch (e) {
      alert(e.response.data.message);
    }
  };
}

export const getAllUsersAPI = async (pageNum = 1, pageSize = 10) => {
  //return async (dispatch) => {
  try {
    const response = await axios.get(
      `${API_URL}users?offset=${pageNum}&count=${pageSize}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    //dispatch(getAllNews(response.data));
    console.log(response.data);
    return response.data;
  } catch (e) {
    alert(e.response.data.message);
  }
  //};
};

export const getAnotherUserAPI = async (userId) => {
  //return async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}user/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    //dispatch(getAllNews(response.data));
    console.log(response.data);
    return response;
  } catch (e) {
    alert(e.response.data.message);
  }
  //};
};

export const updateUserDataAPI = async (
  email,
  first_name,
  second_name,
  birth_date,
  third_name,
  gender,
  city,
  tel
) => {
  try {
    const response = await axios.put(
      `${API_URL}user`,
      {
        email,
        first_name,
        second_name,
        birth_date,
        third_name,
        gender,
        city,
        tel,
      },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    alert(JSON.stringify(response.data));
    return response;
  } catch (e) {
    console.log(e);
    alert(e.response.data.error.message);
  }
};

export const deleteUserAPI = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}user/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    console.log(response.data);
    return userId;
  } catch (e) {
    alert(e.response.data.message);
  }
};

export const putUserRoleAPI = async (userId, role) => {
  try {
    const response = await axios.put(
      `${API_URL}user/${userId}`,
      { role },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    // alert(JSON.stringify(response.data, null, 2));
    console.log(JSON.stringify(response, null, 2));
    return response;
  } catch (e) {
    console.log(e);
    alert(e.response.data.error.message);
  }
};

export const getMyCoursesAPI = async (userId) => {
//  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}user/${userId}/courses`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
//      dispatch(getMyCourses(response.data));
      console.log(response.data);
      return response.data
    } catch (e) {
      if (e.response.data.error.message === "Not found.") {
        return []
      }
        alert(e.response.data.error.message);
    }
//  };
}

export const addUserCourseAPI = async (courseId, userId) => {
  try {
    const response = await axios.post(
      `${API_URL}user/${userId}/course/${courseId}`,
      {},
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    //alert(JSON.stringify(response.data, null, 2));
    console.log(JSON.stringify(response, null, 2));
    return response.data;
  } catch (e) {
    console.log(e);
    alert(e.response.data.error.message);
  }
};

export const deleteUserCourseAPI = async (courseId, userId) => {
  try {
    const response = await axios.delete(
      `${API_URL}user/${userId}/course/${courseId}`,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    //alert(JSON.stringify(response.data, null, 2));
    console.log(JSON.stringify(response, null, 2));
    return response.data;
  } catch (e) {
    console.log(e);
    alert(e.response.data.error.message);
  }
};

export const addCourseChapterAPI = async (courseId, title, content) => {
  try {
    const response = await axios.post(
      `${API_URL}course/${courseId}/chapter`,
      { courseId, title, content },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    //alert(JSON.stringify(response.data, null, 2));
    console.log(JSON.stringify(response, null, 2));
    return response.data;
  } catch (e) {
    console.log(e);
    alert(e.response.data.error.message);
  }
};

export const getAllChaptersAPI = async (courseId) => {
  try {
    const response = await axios.get(
      `${API_URL}course/${courseId}/chapters`,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    //alert(JSON.stringify(response.data, null, 2));
    console.log(JSON.stringify(response, null, 2));
    return response.data;
  } catch (e) {
    if (e.response.data.error.message === "Chapters not found") {
      return [];
    }
    console.log(e);
    alert(e.response.data.error.message);
  }
};

export const getChapterAPI = async (courseId, chapterId) => {
  try {
    const response = await axios.get(
      `${API_URL}course/${courseId}/chapter/${chapterId}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    //alert(JSON.stringify(response.data, null, 2));
    console.log(JSON.stringify(response, null, 2));
    return response.data;
  } catch (e) {
    console.log(e);
    alert(e.response.data.error.message);
  }
};

export const addChapterTestAPI = async (
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
  try {
    const response = await axios.post(
      `${API_URL}course/${courseId}/chapter/${chapterId}/test`,
      {
        question,
        answer1,
        answer2,
        answer3,
        answer4,
        correct_answer,
        score,
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    //alert(JSON.stringify(response.data, null, 2));
    console.log(JSON.stringify(response, null, 2));
    return response.data;
  } catch (e) {
    console.log(e);
    alert(e.response.data.error.message);
  }
};

export const getAllChapterTestsAPI = async (courseId, chapterId) => {
  try {
    const response = await axios.get(
      `${API_URL}course/${courseId}/chapter/${chapterId}/tests`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    //alert(JSON.stringify(response.data, null, 2))
    console.log(JSON.stringify(response, null, 2));
    return response.data;
  } catch (e) {
    console.log(e);
    alert(e.response.data.error.message);
  }
};

export const addTestAnswerAPI = async (testId, answerNum) => {
  try {
    const response = await axios.post(
      `${API_URL}user/test/${testId}/answer/${answerNum}`,
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    //alert(JSON.stringify(response.data, null, 2));
    console.log(JSON.stringify(response, null, 2));
    return response.data;
  } catch (e) {
    console.log(e);
    alert(e.response.data.error.message);
  }
};

export const createThemeAPI = async (theme) => {
  try {
    const response = await axios.post(
      `${API_URL}theme`,
      { theme },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    //alert(JSON.stringify(response.data, null, 2));
    console.log(JSON.stringify(response, null, 2));
    return response.data;
  } catch (e) {
    console.log(e);
    alert(e.response.data.error.message);
  }
};

export const getAllThemesAPI = async () => {
  try {
    const response = await axios.get(
      `${API_URL}themes`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    //alert(JSON.stringify(response.data, null, 2));
    console.log(JSON.stringify(response, null, 2));
    return response.data;
  } catch (e) {
    console.log(e);
    alert(e.response.data.error.message);
  }
};

export const addCourseThemeAPI = async (courseId, themeId, theme) => {
  try {
    const response = await axios.post(
      `${API_URL}course/${courseId}/theme/${themeId}`,
      {theme},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    //alert(JSON.stringify(response.data, null, 2));
    console.log(JSON.stringify(response, null, 2));
    return response.data;
  } catch (e) {
    console.log(e);
    alert(e.response.data.error.message);
  }
};

export const getAllCourseThemesAPI = async (courseId) => {
  try {
    const response = await axios.get(
      `${API_URL}course/${courseId}/themes`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    //alert(JSON.stringify(response.data, null, 2));
    console.log(JSON.stringify(response, null, 2));
    return response.data;
  } catch (e) {
    console.log(e);
    alert(e.response.data.error.message);
  }
};
