import { get, post, put } from '../utils/request';
import * as actions from '../constants/user';

export function signup({ username, name, email, password }) {
  return (dispatch) => {
    dispatch({
      type: actions.CREATE_USER_REQUEST,
      payload: null,
    });

    const body = { username, name, email, password };

    post('http://localhost:8080/api/signup', { body })
    .then(() => {
      dispatch({
        type: actions.CREATE_USER_SUCCESS,
        payload: {
          username,
          name,
          email,
          avatarUrl: '/defaultAvatar',
          errors: [],
        },
      });
    }).catch(() => {
      dispatch({
        type: actions.CREATE_USER_FAIL,
        payload: {},
      });
    });
  };
}
