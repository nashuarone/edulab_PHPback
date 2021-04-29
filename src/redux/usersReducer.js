import { getAllUsersAPI, deleteUserAPI, putUserRoleAPI } from "../api/api";

const SET_USERS = "SET_USERS";
const SET_ROLE = "SET_ROLE";
const SET_FILTERED_USERS = "SET_FILTERED_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

let initialState = {
  users: [],
  pageSize: 10,
  totalCount: 6,
  currentPage: 1,
  isFetching: true,
};

const userReducer = (state_u = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state_u,
        users: action.users,
        //users: [...state_u.users, ...action.users],
      };
    case SET_FILTERED_USERS:
      return {
        ...state_u,
        users: state_u.users.filter((it) => it.id !== action.userId),
      };
    case SET_ROLE:
      return {
        ...state_u,
        users: state_u.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, role: action.role };
          }
          return u;
        }),
      };
    case SET_CURRENT_PAGE:
      return {
        ...state_u,
        currentPage: action.pageNumber,
      };
    case SET_TOTAL_USERS_COUNT:
      return {
        ...state_u,
        totalCount: action.totalCount,
      };
    case TOGGLE_IS_FETCHING:
      return {
        ...state_u,
        isFetching: action.fetchingStatus,
      };
    default:
      return state_u;
  }
};

export const setUsers = (users) => ({ type: SET_USERS, users });
export const setFilteredUsers = (userId) => ({ type: SET_FILTERED_USERS, userId });
export const setUserRole = (userId, role) => ({ type: SET_ROLE, userId, role });
export const setCurrentPage = (pageNumber) => ({
  type: SET_CURRENT_PAGE,
  pageNumber,
});
export const setTotalUsersCount = (totalCount) => ({
  type: SET_TOTAL_USERS_COUNT,
  totalCount,
});
export const toggleIsFetching = (fetchingStatus) => ({
  type: TOGGLE_IS_FETCHING,
  fetchingStatus,
});

export const getUsers = (pageNm, pageSz) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(pageNm));
    getAllUsersAPI(pageNm, pageSz).then((data) => {
      dispatch(toggleIsFetching(false));
      dispatch(setUsers(data));
      dispatch(setTotalUsersCount(data.length));
    });
  };
};
export const deleteUserProfile = (userId) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    deleteUserAPI(userId).then((uId) => {
      dispatch(toggleIsFetching(false));
      dispatch(setFilteredUsers(uId));
    });
  };
};
export const putUserRole = (userId, role) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    putUserRoleAPI(userId, role).then((res) => {
      dispatch(toggleIsFetching(false));
      dispatch(setUserRole(res.data.id, res.data.role));
      console.log(res.data)
    });
  };
};

export default userReducer;
