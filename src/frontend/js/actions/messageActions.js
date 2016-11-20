import request from '../utils/request';


export const GET_MESSAGES_REQUEST = 'GET_MESSAGES_REQUEST';
export const GET_MESSAGES_SUCCESS = 'GET_MESSAGES_SUCCESS';
export const GET_MESSAGES_FAIL = 'GET_MESSAGES_FAIL';

export const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAIL = 'SEND_MESSAGE_FAIL';

export const REMOVE_MESSAGE_REQUEST = 'REMOVE_MESSAGE_REQUEST';
export const REMOVE_MESSAGE_SUCCESS = 'REMOVE_MESSAGE_SUCCESS';
export const REMOVE_MESSAGE_FAIL = 'REMOVE_MESSAGE_FAIL';


export function fetchMessages({ dialogId }) {
  return dispatch => {
    dispatch({
      type: GET_MESSAGES_REQUEST,
    });

    request('get', `http://localhost:8080/api/dialog/${dialogId}/messages`)
    .then(({ list }) => {
      dispatch({
        type: GET_MESSAGES_SUCCESS,
        payload: { dialogId, list },
      });
    }).catch(errors => {
      dispatch({
        type: GET_MESSAGES_FAIL,
        payload: { errors },
      });
    });
  };
}


export function sendMessage({ dialogId, text }) {
  return dispatch => {
    dispatch({
      type: SEND_MESSAGE_REQUEST,
    });

    const body = { text };

    request('post', `http://localhost:8080/api/dialog/${dialogId}/message`, { body })
    .then(res => {
      dispatch({
        type: SEND_MESSAGE_SUCCESS,
        payload: { message: res.message },
      });
    }).catch(errors => {
      dispatch({
        type: SEND_MESSAGE_FAIL,
        payload: { errors },
      });
    });
  };
}


export function removeMessage({ dialogId }) {
  return dispatch => {
    dispatch({
      type: GET_MESSAGES_REQUEST,
    });

    request('get', `http://localhost:8080/api/dialogs/${dialogId}`)
    .then(() => {
      dispatch({
        type: GET_MESSAGES_SUCCESS,
        payload: { dialogId },
      });
    }).catch(errors => {
      dispatch({
        type: GET_MESSAGES_FAIL,
        payload: { errors },
      });
    });
  };
}
