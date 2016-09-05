import { get, post, put } from '../utils/request';
import * as actions from '../constants/user';

export function getAll() {
  return (dispatch) => {
    dispatch({
      type: actions.GET_DIALOGS_REQUEST,
    });

    get('http://localhost:8080/api/dialogs')
    .then(result => {
      dispatch({
        type: actions.GET_DIALOGS_SUCCESS,
        payload: { list: result.list },
      });
    }).catch(errors => {
      dispatch({
        type: actions.GET_DIALOGS_FAIL,
        payload: { errors },
      });
    });
  };
}


export function create({ id }) {
  return (dispatch) => {
    dispatch({
      type: actions.CREATE_DIALOG_REQUEST,
    });

    const body = { id };

    post('http://localhost:8080/api/dialogs', { body })
    .then(result => {
      dispatch({
        type: actions.CREATE_DIALOG_SUCCESS,
        payload: {
          id: result.id,
          name: result.name,
        },
      });
    }).catch(errors => {
      dispatch({
        type: actions.CREATE_DIALOG_FAIL,
        payload: { errors },
      });
    });
  };
}


export function remove({ id }) {
  return (dispatch) => {
    dispatch({
      type: actions.REMOVE_DIALOG_REQUEST,
    });

    remove(`http://localhost:8080/api/dialogs/${id}`)
    .then(result => {
      dispatch({
        type: actions.REMOVE_DIALOG_SUCCESS,
        payload: {
          id: result.id,
          name: result.name,
        },
      });
    }).catch(errors => {
      dispatch({
        type: actions.REMOVE_DIALOG_FAIL,
        payload: { errors },
      });
    });
  };
}
