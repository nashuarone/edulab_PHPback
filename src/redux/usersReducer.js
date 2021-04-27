import { getAllUsersAPI, deleteUserAPI } from "../api/api";

const SET_USERS = "SET_USERS";
const SET_FILTERED_USERS = "SET_FILTERED_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

let initialState = {
  users: [],
  pageSize: 10,
  totalCount: 10,
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
        //users: [...state_u.users, ...action.users],
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

export default userReducer;
