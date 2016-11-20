import { get, post, put } from '../utils/request';
import * as dialogActions from './dialog';


export const SET_USER_NAME_REQUEST = 'SET_USER_NAME_REQUEST';
export const SET_USER_NAME_SUCCESS = 'SET_USER_NAME_SUCCESS';
export const SET_USER_NAME_FAIL = 'SET_USER_NAME_FAIL';

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAIL = 'CREATE_USER_FAIL';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAIL = 'UPDATE_USER_FAIL';

export const SIGNIN_USER_REQUEST = 'SIGNIN_USER_REQUEST';
export const SIGNIN_USER_SUCCESS = 'SIGNIN_USER_SUCCESS';
export const SIGNIN_USER_FAIL = 'SIGNIN_USER_FAIL';

export const SIGNOUT_USER_REQUEST = 'SIGNOUT_USER_REQUEST';
export const SIGNOUT_USER_SUCCESS = 'SIGNOUT_USER_SUCCESS';
export const SIGNOUT_USER_FAIL = 'SIGNOUT_USER_FAIL';

export const LOAD_USER_INFO_REQUEST = 'LOAD_USER_INFO_REQUEST';
export const LOAD_USER_INFO_SUCCESS = 'LOAD_USER_INFO_SUCCESS';
export const LOAD_USER_INFO_FAIL = 'LOAD_USER_INFO_FAIL';


/* Signup user */

function signupRequest() {
  return { type: CREATE_USER_REQUEST };
}

function signupSuccess({ username, name, email }) {
  return {
    type: CREATE_USER_SUCCESS,
    payload: {
      username,
      name,
      email,
      avatarUrl: '/defaultAvatar',
      errors: [],
    },
  };
}

function signupFail() {
  return { type: CREATE_USER_FAIL };
}

export function signup({ username, name, email, password }) {
  return dispatch => {
    dispatch(signupRequest());

    const body = { username, name, email, password };

    post('http://localhost:8080/api/signup', { body })
    .then(() => dispatch(signupSuccess({ username, name, email })))
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

export function signin({ username, password }) {
  return dispatch => {
    dispatch(signinRequest());

    const body = { username, password };

    post('http://localhost:8080/api/signin', { body })
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

    get('http://localhost:8080/api/signout')
    .then(res => dispatch(signoutSuccess(res)))
    .catch(() => dispatch(signoutFail()));
  };
}


/* Load user info */

function loadInfoRequest() {
  return { type: LOAD_USER_INFO_REQUEST };
}

function loadInfoSuccess(payload) {
  return { type: LOAD_USER_INFO_SUCCESS, payload };
}

function loadInfoFail() {
  return { type: LOAD_USER_INFO_FAIL };
}

export function loadInfo() {
  return dispatch => {
    dispatch(loadInfoRequest());

    get('http://localhost:8080/api/me')
    .then(res => {
      dispatch(loadInfoSuccess(res));
      dispatch(dialogActions.updateDialogListSuccess(res.dialogs));
    })
    .catch(() => dispatch(loadInfoFail()));
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

export function update({ username, name, email }) {
  return dispatch => {
    dispatch(updateRequest());

    const body = { username, name, email };

    put('http://localhost:8080/api/me', { body })
    .then(() => dispatch(updateSuccess({ username, name, email })))
    .catch(() => dispatch(updateFail()));
  };
}
