import { get } from '../utils/request';

export const SEARCH_USER_REQUEST = 'SEARCH_USER_REQUEST';
export const SEARCH_USER_SUCCESS = 'SEARCH_USER_SUCCESS';
export const SEARCH_USER_FAIL = 'SEARCH_USER_FAIL';

export const SEARCH_CHANNEL_REQUEST = 'SEARCH_CHANNEL_REQUEST';
export const SEARCH_CHANNEL_SUCCESS = 'SEARCH_CHANNEL_SUCCESS';
export const SEARCH_CHANNEL_FAIL = 'SEARCH_CHANNEL_FAIL';

export const SEARCH_CLEAR = 'SEARCH_CLEAR';


/* Find user */

function findUserRequest() {
  return { type: SEARCH_USER_REQUEST };
}

function findUserSuccess(payload) {
  return { type: SEARCH_USER_SUCCESS, payload };
}

function findUserFail() {
  return { type: SEARCH_USER_FAIL };
}

export function findUser({ username }) {
  return dispatch => {
    dispatch(findUserRequest());

    get(`http://localhost:8080/api/users/${username}`)
    .then(({ userList }) => dispatch(findUserSuccess({ userList })))
    .catch(() => dispatch(findUserFail()));
  };
}


/* Clear field */

function clearSuccess() {
  return { type: SEARCH_CLEAR };
}

export function clear() {
  return dispatch => dispatch(clearSuccess());
}
