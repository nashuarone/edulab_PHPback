import axios from 'axios'
import { setLearner } from '../redux/profileReducer'
import { setFiles, addFile, deleteFileAC } from "../redux/fileReducer";
import { addCourse, getAllCourses } from '../redux/coursesReducer';
import { API_URL } from "../config";
import { addNews, getAllNews } from '../redux/newsReducer';

export const registrationAPI = async (email, password, myname, surname) => {
  try {
    const response = await axios.post(`${API_URL}api/auth/registration`, {
      email,
      password,
      myname,
      surname
    })
    alert(response.data.message)
  } catch (e) {
    alert(e.response.data.message)
  }
}

export const loginAPI = (email, password) => {
  return async dispatch => {
    try {
      const response = await axios.post(
        `${API_URL}api/auth/login`,
        {
          email,
          password,
        }
      );
      dispatch(setLearner(response.data.learner))
      localStorage.setItem('token', response.data.token)
      console.log(response.data)
    } catch (e) {
      alert(e.response.data.message);
    }
  }
};

export const authAPI = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${API_URL}api/auth/auth`, {headers: {Authorization:`Bearer ${localStorage.getItem('token')}`}}
      );
      dispatch(setLearner(response.data.learner));
      localStorage.setItem("token", response.data.token);
      console.log(response.data);
    } catch (e) {
      localStorage.removeItem('token')
      alert(e.response.data.message);
    }
  };
};

export const uploadAvatarAPI = (file) => {
  return async (dispatch) => {
    try {
      const formData = new FormData()
      formData.append("file", file);
      const response = await axios.post(`${API_URL}api/files/avatar`, formData,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch(setLearner(response.data));
    } catch (e) {
      console.log(e)
    }
  };
};

export const deleteAvatarAPI = () => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `${API_URL}api/files/avatar`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(setLearner(response.data));
    } catch (e) {
      console.log(e);
    }
  };
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

export function createCourseAPI(title, videoLink, description) {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${API_URL}api/courses`,
        {
          title,
          videoLink,
          description,
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

export function getAllCoursesAPI() {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${API_URL}api/courses`,
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
