import { get, post, put } from '../utils/request';
import * as dialogActions from './dialogActions';


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


export function signup({ username, name, email, password }) {
  return dispatch => {
    dispatch({
      type: CREATE_USER_REQUEST,
    });

    const body = { username, name, email, password };

    post('http://localhost:8080/api/signup', { body })
    .then(() => {
      dispatch({
        type: CREATE_USER_SUCCESS,
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
        type: CREATE_USER_FAIL,
      });
    });
  };
}


export function signin({ username, password }) {
  return dispatch => {
    dispatch({
      type: SIGNIN_USER_REQUEST,
    });

    const body = { username, password };

    post('http://localhost:8080/api/signin', { body })
    .then(res => {
      dispatch({
        type: SIGNIN_USER_SUCCESS,
        payload: res,
      });
    })
    .catch(() => {
      dispatch({
        type: SIGNIN_USER_FAIL,
      });
    });
  };
}


export function signout() {
  return dispatch => {
    dispatch({
      type: SIGNOUT_USER_REQUEST,
    });

    get('http://localhost:8080/api/signout')
    .then(res => {
      dispatch({
        type: SIGNOUT_USER_SUCCESS,
        payload: res,
      });
    })
    .catch(() => {
      dispatch({
        type: SIGNOUT_USER_FAIL,
      });
    });
  };
}


export function loadInfo() {
  return dispatch => {
    dispatch({
      type: LOAD_USER_INFO_REQUEST,
    });

    get('http://localhost:8080/api/me')
    .then(res => {
      dispatch({
        type: LOAD_USER_INFO_SUCCESS,
        payload: res,
      });

      dispatch({
        type: dialogActions.UPDATE_DIALOG_LIST,
        payload: res.dialogs,
      });
    })
    .catch(() => {
      dispatch({
        type: LOAD_USER_INFO_FAIL,
      });
    });
  };
}


export function update({ username, name, email }) {
  return dispatch => {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });

    const body = { username, name, email };

    put('http://localhost:8080/api/me', { body })
    .then(() => {
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { username, name, email },
      });
    })
    .catch(() => {
      dispatch({
        type: UPDATE_USER_FAIL,
      });
    });
  };
}
