import { get, post, put } from '../utils/request';
import * as actions from '../constants/dialogs';


export function create({ dialogUserId, dialogName }) {
  return (dispatch) => {
    dispatch({
      type: actions.CREATE_DIALOG_REQUEST,
    });

    const body = { dialogUserId, dialogName };

    post('http://localhost:8080/api/dialogs', { body })
    .then(result => {
      dispatch({
        type: actions.CREATE_DIALOG_SUCCESS,
        payload: { dialogUserId, dialogName },
      });
    }).catch(errors => {
      dispatch({
        type: actions.CREATE_DIALOG_FAIL,
        payload: { errors },
      });
    });
  };
}


export function remove({ dialogUserId }) {
  return (dispatch) => {
    dispatch({
      type: actions.REMOVE_DIALOG_REQUEST,
    });

    remove(`http://localhost:8080/api/dialogs/${dialogUserId}`)
    .then(result => {
      dispatch({
        type: actions.REMOVE_DIALOG_SUCCESS,
        payload: { dialogUserId },
      });
    }).catch(errors => {
      dispatch({
        type: actions.REMOVE_DIALOG_FAIL,
        payload: { errors },
      });
    });
  };
}
