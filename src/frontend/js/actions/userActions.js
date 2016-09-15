import { get, post, put } from '../utils/request';
import * as userActions from '../constants/user';
import * as dialogsActions from '../constants/dialogs';


export function signup({ username, name, email, password }) {
  return dispatch => {
    dispatch({
      type: userActions.CREATE_USER_REQUEST,
    });

    const body = { username, name, email, password };

    post('http://localhost:8080/api/signup', { body })
    .then(() => {
      dispatch({
        type: userActions.CREATE_USER_SUCCESS,
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
        type: userActions.CREATE_USER_FAIL,
      });
    });
  };
}


export function signin({ username, password }) {
  return dispatch => {
    dispatch({
      type: userActions.SIGNIN_USER_REQUEST,
    });

    const body = { username, password };

    post('http://localhost:8080/api/signin', { body })
    .then(res => {
      dispatch({
        type: userActions.SIGNIN_USER_SUCCESS,
        payload: res,
      });
    })
    .catch(() => {
      dispatch({
        type: userActions.SIGNIN_USER_FAIL,
      });
    });
  };
}


export function signout() {
  return dispatch => {
    dispatch({
      type: userActions.SIGNOUT_USER_REQUEST,
    });

    get('http://localhost:8080/api/signout')
    .then(res => {
      dispatch({
        type: userActions.SIGNOUT_USER_SUCCESS,
        payload: res,
      });
    })
    .catch(() => {
      dispatch({
        type: userActions.SIGNOUT_USER_FAIL,
      });
    });
  };
}


export function loadInfo() {
  return dispatch => {
    dispatch({
      type: userActions.LOAD_USER_INFO_REQUEST,
    });

    get('http://localhost:8080/api/user')
    .then(res => {
      dispatch({
        type: userActions.LOAD_USER_INFO_SUCCESS,
        payload: res,
      });

      dispatch({
        type: dialogsActions.UPDATE_DIALOG_LIST,
        payload: res.dialogs.list,
      });
    })
    .catch(() => {
      dispatch({
        type: userActions.LOAD_USER_INFO_FAIL,
      });
    });
  };
}


export function update({ username, name, email }) {
  return dispatch => {
    dispatch({
      type: userActions.UPDATE_USER_REQUEST,
    });

    const body = { username, name, email };

    put('http://localhost:8080/api/user', { body })
    .then(() => {
      dispatch({
        type: userActions.UPDATE_USER_SUCCESS,
        payload: { username, name, email },
      });
    })
    .catch(() => {
      dispatch({
        type: userActions.UPDATE_USER_FAIL,
      });
    });
  };
}
