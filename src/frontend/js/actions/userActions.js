import * as actions from '../constants/user';

export function signup({ username, name, email, password }) {
  return (dispatch) => {
    dispatch({
      type: actions.CREATE_USER_REQUEST,
      payload: null,
    });

    /* eslint quote-props: 0 */
    fetch(
      'http://localhost:8080/api/signup',
      {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, name, email, password }),
      }
    )
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

    const userData = new FormData();
    userData.append('username', username);
    userData.append('password', password);

    fetch('http://localhost:8080/api/signin', {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      credentials: 'include',
      body: `username=${username}&password=${password}`,
    })
    .then(res => res.json())
    .then(res => {
      dispatch({
        type: actions.SIGNIN_USER_SUCCESS,
        payload: res,
      });
    })
    .catch(() => {
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

    fetch('http://localhost:8080/api/signout', {
      method: 'get',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      credentials: 'include',
    })
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

    fetch('http://localhost:8080/api/user', {
      method: 'get',
      credentials: 'include',
    })
    .then(res => res.json())
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

    fetch('http://localhost:8080/api/user', {
      method: 'put',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      credentials: 'include',
      body: `username=${username}&name=${name}&email=${email}`,
    })
    .then(res => res.json())
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
