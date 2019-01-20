import { get, post, put } from '../utils/request';

export const SET_USER_NAME_REQUEST = 'SET_USER_NAME_REQUEST';
export const SET_USER_NAME_SUCCESS = 'SET_USER_NAME_SUCCESS';
export const SET_USER_NAME_FAIL = 'SET_USER_NAME_FAIL';

export const SIGNUP_USER_REQUEST = 'SIGNUP_USER_REQUEST';
export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS';
export const SIGNUP_USER_FAIL = 'SIGNUP_USER_FAIL';

export const SIGNIN_USER_REQUEST = 'SIGNIN_USER_REQUEST';
export const SIGNIN_USER_SUCCESS = 'SIGNIN_USER_SUCCESS';
export const SIGNIN_USER_FAIL = 'SIGNIN_USER_FAIL';

export const SIGNOUT_USER_REQUEST = 'SIGNOUT_USER_REQUEST';
export const SIGNOUT_USER_SUCCESS = 'SIGNOUT_USER_SUCCESS';
export const SIGNOUT_USER_FAIL = 'SIGNOUT_USER_FAIL';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAIL = 'UPDATE_USER_FAIL';

export const LOAD_USER_INFO_REQUEST = 'LOAD_USER_INFO_REQUEST';
export const LOAD_USER_INFO_SUCCESS = 'LOAD_USER_INFO_SUCCESS';
export const LOAD_USER_INFO_FAIL = 'LOAD_USER_INFO_FAIL';

/* Signup user */

function signupRequest() {
  return { type: SIGNUP_USER_REQUEST };
}

function signupSuccess({ login, name, expiresIn }) {
  return {
    type: SIGNUP_USER_SUCCESS,
    payload: {
      login,
      name,
      avatarUrl: '/defaultAvatar',
      errors: [],
      expiresIn,
    },
  };
}

function signupFail() {
  return { type: SIGNUP_USER_FAIL };
}

export function signup({ login, name, password }) {
  return dispatch => {
    dispatch(signupRequest());

    const body = { login, name, password };

    return post('http://localhost:8080/api/signup', { body })
      .then(res => {
        if (res.success === true) {
          return dispatch(
            signupSuccess({
              login,
              name,
              expiresIn: res.expiresIn,
            }),
          );
        } else {
          return dispatch(signupFail());
        }
      })
      .catch(() => dispatch(signupFail()));
  };
}

/* Signin user */

function signinRequest() {
  return { type: SIGNIN_USER_REQUEST };
}

function signinSuccess(payload) {
  return { type: SIGNIN_USER_SUCCESS, payload };
}

function signinFail() {
  return { type: SIGNIN_USER_FAIL };
}

export function signin({ login, password }) {
  return dispatch => {
    dispatch(signinRequest());

    const body = { login, password };

    return post('http://localhost:8080/api/signin', { body })
      .then(res => dispatch(signinSuccess(res)))
      .catch(() => dispatch(signinFail()));
  };
}

/* Signout user */

function signoutRequest() {
  return { type: SIGNOUT_USER_REQUEST };
}

function signoutSuccess(payload) {
  return { type: SIGNOUT_USER_SUCCESS, payload };
}

function signoutFail() {
  return { type: SIGNOUT_USER_FAIL };
}

export function signout() {
  return dispatch => {
    dispatch(signoutRequest());

    return post('http://localhost:8080/api/signout', {}, true)
      .then(res => dispatch(signoutSuccess(res)))
      .catch(() => dispatch(signoutFail()));
  };
}

/* Load user info */

function loadInfoRequest() {
  return { type: LOAD_USER_INFO_REQUEST };
}

function loadInfoSuccess({ success, ...payload }) {
  return { type: LOAD_USER_INFO_SUCCESS, payload };
}

function loadInfoFail({ success, ...payload }) {
  return { type: LOAD_USER_INFO_FAIL, payload };
}

export function loadInfo() {
  return dispatch => {
    dispatch(loadInfoRequest());

    return get('http://localhost:8080/api/me', {}, true)
      .then(res => {
        if (res.success) {
          dispatch(loadInfoSuccess(res.payload));
        } else {
          dispatch(loadInfoFail(res));
        }
      })
      .catch(err => dispatch(loadInfoFail(err)));
  };
}

/* Update user info */

function updateRequest() {
  return { type: UPDATE_USER_REQUEST };
}

function updateSuccess(payload) {
  return { type: UPDATE_USER_SUCCESS, payload };
}

function updateFail() {
  return { type: UPDATE_USER_FAIL };
}

export function update({ login, name }) {
  return dispatch => {
    dispatch(updateRequest());

    const body = { login, name };

    return put('http://localhost:8080/api/me', { body }, true)
      .then(() => dispatch(updateSuccess({ login, name })))
      .catch(() => dispatch(updateFail()));
  };
}
