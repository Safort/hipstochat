import request from '../utils/request';
import * as actions from '../constants/dialog';


export function create({ interlocutorId, name }) {
  return dispatch => {
    dispatch({
      type: actions.CREATE_DIALOG_REQUEST,
    });

    const body = { interlocutorId, name };

    request('post', 'http://localhost:8080/api/dialogs', { body })
    .then(res => {
      if (res.success === true) {
        dispatch({
          type: actions.CREATE_DIALOG_SUCCESS,
          payload: body,
        });
      } else {
        dispatch({
          type: actions.CREATE_DIALOG_FAIL,
          payload: { errors: res.errors },
        });
      }
    }).catch(errors => {
      dispatch({
        type: actions.CREATE_DIALOG_FAIL,
        payload: { errors },
      });
    });
  };
}


export function remove({ id }) {
  return dispatch => {
    dispatch({
      type: actions.REMOVE_DIALOG_REQUEST,
    });

    request('delete', `http://localhost:8080/api/dialogs/${id}`)
    .then(() => {
      dispatch({
        type: actions.REMOVE_DIALOG_SUCCESS,
        payload: { id },
      });
    }).catch(errors => {
      dispatch({
        type: actions.REMOVE_DIALOG_FAIL,
        payload: { errors },
      });
    });
  };
}
