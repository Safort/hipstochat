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


export function signin({ username, password }) {
  return (dispatch) => {
    dispatch({
      type: actions.SIGNIN_USER_REQUEST,
      payload: null,
    });

    const body = { username, password };

    post('http://localhost:8080/api/signin', { body })
    .then(res => {
      dispatch({
        type: actions.SIGNIN_USER_SUCCESS,
        payload: res,
      });
    })
    .catch(err => {
      console.log('Error: ', err);
      dispatch({
        type: actions.SIGNIN_USER_FAIL,
        payload: {},
      });
    });
  };
}


export function signout() {
  return (dispatch) => {
    dispatch({
      type: actions.SIGNOUT_USER_REQUEST,
      payload: null,
    });

    get('http://localhost:8080/api/signout')
    .then(res => {
      dispatch({
        type: actions.SIGNOUT_USER_SUCCESS,
        payload: res,
      });
    })
    .catch(() => {
      dispatch({
        type: actions.SIGNOUT_USER_FAIL,
        payload: {},
      });
    });
  };
}

export function loadInfo() {
  return (dispatch) => {
    dispatch({
      type: actions.LOAD_USER_INFO_REQUEST,
      payload: null,
    });

    get('http://localhost:8080/api/user')
    .then(res => {
      dispatch({
        type: actions.LOAD_USER_INFO_SUCCESS,
        payload: res,
      });
    })
    .catch(() => {
      dispatch({
        type: actions.LOAD_USER_INFO_FAIL,
        payload: {},
      });
    });
  };
}

export function update({ username, name, email }) {
  return (dispatch) => {
    dispatch({
      type: actions.UPDATE_USER_REQUEST,
      payload: null,
    });

    const body = { username, name, email };

    put('http://localhost:8080/api/user', { body })
    .then(() => {
      dispatch({
        type: actions.UPDATE_USER_SUCCESS,
        payload: { username, name, email },
      });
    })
    .catch(() => {
      dispatch({
        type: actions.UPDATE_USER_FAIL,
        payload: {},
      });
    });
  };
}
