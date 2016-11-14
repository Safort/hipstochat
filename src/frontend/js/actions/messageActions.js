import request from '../utils/request';
import * as actions from '../constants/message';


export function fetchMessages({ dialogId }) {
  return dispatch => {
    dispatch({
      type: actions.GET_MESSAGES_REQUEST,
    });

    request('get', `http://localhost:8080/api/dialog/${dialogId}/messages`)
    .then(({ list }) => {
      dispatch({
        type: actions.GET_MESSAGES_SUCCESS,
        payload: { dialogId, list },
      });
    }).catch(errors => {
      dispatch({
        type: actions.GET_MESSAGES_FAIL,
        payload: { errors },
      });
    });
  };
}


export function sendMessage({ dialogId, text }) {
  return dispatch => {
    dispatch({
      type: actions.SEND_MESSAGE_REQUEST,
    });

    const body = { text };

    request('post', `http://localhost:8080/api/dialog/${dialogId}/message`, { body })
    .then(res => {
      dispatch({
        type: actions.SEND_MESSAGE_SUCCESS,
        payload: { message: res.message },
      });
    }).catch(errors => {
      dispatch({
        type: actions.SEND_MESSAGE_FAIL,
        payload: { errors },
      });
    });
  };
}


export function removeMessage({ dialogId }) {
  return dispatch => {
    dispatch({
      type: actions.GET_MESSAGES_REQUEST,
    });

    request('get', `http://localhost:8080/api/dialogs/${dialogId}`)
    .then(() => {
      dispatch({
        type: actions.GET_MESSAGES_SUCCESS,
        payload: { dialogId },
      });
    }).catch(errors => {
      dispatch({
        type: actions.GET_MESSAGES_FAIL,
        payload: { errors },
      });
    });
  };
}
