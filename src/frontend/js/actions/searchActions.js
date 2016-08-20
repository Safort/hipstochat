import { get } from '../utils/request';
import * as actions from '../constants/search';

export function searchUser({ username }) {
  return (dispatch) => {
    dispatch({
      type: actions.SEARCH_USER_REQUEST,
      payload: null,
    });

    get(`http://localhost:8080/api/users/${username}`)
    .then(({ userList }) => {
      dispatch({
        type: actions.SEARCH_USER_SUCCESS,
        payload: {
          userList,
          errors: [],
        },
      });
    })
    .catch(() => {
      dispatch({
        type: actions.SEARCH_USER_FAIL,
        payload: {},
      });
    });
  };
}