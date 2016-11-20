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


/* Fetch dialog messages */

function fetchMessagesRequest() {
  return { type: GET_MESSAGES_REQUEST };
}

function fetchMessagesSuccess(payload) {
  return { type: GET_MESSAGES_SUCCESS, payload };
}

function fetchMessagesFail(errors) {
  return { type: GET_MESSAGES_FAIL, payload: { errors } };
}

export function fetchMessages({ dialogId }) {
  return dispatch => {
    dispatch(fetchMessagesRequest());

    request('get', `http://localhost:8080/api/dialog/${dialogId}/messages`)
    .then(({ list }) => dispatch(fetchMessagesSuccess({ dialogId, list })))
    .catch(errors => dispatch(fetchMessagesFail(errors)));
  };
}


/* Send mesage */

function sendMessageRequest() {
  return { type: SEND_MESSAGE_REQUEST };
}

function sendMessageSuccess(payload) {
  return { type: SEND_MESSAGE_SUCCESS, payload };
}

function sendMessageFail(errors) {
  return { type: SEND_MESSAGE_FAIL, payload: { errors } };
}

export function sendMessage({ dialogId, text }) {
  return dispatch => {
    dispatch(sendMessageRequest());

    const body = { text };

    request('post', `http://localhost:8080/api/dialog/${dialogId}/message`, { body })
    .then(res => dispatch(sendMessageSuccess({ message: res.message })))
    .catch(errors => dispatch(sendMessageFail(errors)));
  };
}


/* Remove message */

function removeMessageRequest() {
  return { type: REMOVE_MESSAGE_REQUEST };
}

function removeMessageSuccess(payload) {
  return { type: REMOVE_MESSAGE_SUCCESS, payload };
}

function removeMessageFail(errors) {
  return { type: REMOVE_MESSAGE_FAIL, payload: { errors } };
}

export function removeMessage({ dialogId }) {
  return dispatch => {
    dispatch(removeMessageRequest());

    request('get', `http://localhost:8080/api/dialogs/${dialogId}`)
    .then(() => dispatch(removeMessageSuccess({ dialogId })))
    .catch(errors => dispatch(removeMessageFail(errors)));
  };
}
