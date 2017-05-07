import request from '../utils/request';


export const CREATE_DIALOG_REQUEST = 'CREATE_DIALOG_REQUEST';
export const CREATE_DIALOG_SUCCESS = 'CREATE_DIALOG_SUCCESS';
export const CREATE_DIALOG_FAIL = 'CREATE_DIALOG_FAIL';

export const GET_DIALOGS_REQUEST = 'GET_DIALOGS_REQUEST';
export const GET_DIALOGS_SUCCESS = 'GET_DIALOGS_SUCCESS';
export const GET_DIALOGS_FAIL = 'GET_DIALOGS_FAIL';

export const REMOVE_DIALOG_REQUEST = 'REMOVE_DIALOG_REQUEST';
export const REMOVE_DIALOG_SUCCESS = 'REMOVE_DIALOG_SUCCESS';
export const REMOVE_DIALOG_FAIL = 'REMOVE_DIALOG_FAIL';

export const UPDATE_DIALOG_LIST = 'UPDATE_DIALOG_LIST';


export function updateDialogListSuccess(payload) {
  return { type: UPDATE_DIALOG_LIST, payload };
}


/* Create dialog */

function createRequest() {
  return { type: CREATE_DIALOG_REQUEST };
}

function createSuccess(payload) {
  return { type: CREATE_DIALOG_SUCCESS, payload };
}

function createFail(errors) {
  return { type: CREATE_DIALOG_FAIL, payload: errors };
}

export function create({ interlocutorId, name }) {
  return dispatch => {
    dispatch(createRequest());

    const body = { interlocutorId, name };

    request('post', 'http://localhost:8080/api/dialogs', { body })
    .then(res => {
      if (res.success === true) {
        dispatch(createSuccess(body));
      } else {
        dispatch(createFail(res.errors));
      }
    }).catch(errors => createFail(errors));
  };
}


/* Remove dialog */

function removeRequest() {
  return { type: REMOVE_DIALOG_REQUEST };
}

function removeSuccess(id) {
  return { type: REMOVE_DIALOG_SUCCESS, payload: { id } };
}

function removeFail(errors) {
  return { type: REMOVE_DIALOG_FAIL, payload: { errors } };
}

export function remove({ id }) {
  return dispatch => {
    dispatch(removeRequest());

    request('delete', `http://localhost:8080/api/me/dialog/${id}`)
    .then(() => dispatch(removeSuccess(id)))
    .catch(errors => dispatch(removeFail(errors)));
  };
}
