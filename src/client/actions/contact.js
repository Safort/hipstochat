import request from '../utils/request';


export const CREATE_CONTACT_REQUEST = 'CREATE_CONTACT_REQUEST';
export const CREATE_CONTACT_SUCCESS = 'CREATE_CONTACT_SUCCESS';
export const CREATE_CONTACT_FAIL = 'CREATE_CONTACT_FAIL';

export const GET_CONTACTS_REQUEST = 'GET_CONTACTS_REQUEST';
export const GET_CONTACTS_SUCCESS = 'GET_CONTACTS_SUCCESS';
export const GET_CONTACTS_FAIL = 'GET_CONTACTS_FAIL';

export const REMOVE_CONTACT_REQUEST = 'REMOVE_CONTACT_REQUEST';
export const REMOVE_CONTACT_SUCCESS = 'REMOVE_CONTACT_SUCCESS';
export const REMOVE_CONTACT_FAIL = 'REMOVE_CONTACT_FAIL';

export const UPDATE_CONTACT_LIST = 'UPDATE_CONTACT_LIST';


export function updateContactListSuccess(payload) {
  return { type: UPDATE_CONTACT_LIST, payload };
}


/* Create contact */

function createRequest() {
  return { type: CREATE_CONTACT_REQUEST };
}

function createSuccess(payload) {
  return { type: CREATE_CONTACT_SUCCESS, payload };
}

function createFail(errors) {
  return { type: CREATE_CONTACT_FAIL, payload: errors };
}

export function create({ interlocutorId, name }) {
  return dispatch => {
    dispatch(createRequest());

    const body = { interlocutorId, name };

    request('post', 'http://localhost:8080/api/contacts', { body })
    .then(res => {
      if (res.success === true) {
        dispatch(createSuccess(body));
      } else {
        dispatch(createFail(res.errors));
      }
    }).catch(errors => createFail(errors));
  };
}


/* Remove contact */

function removeRequest() {
  return { type: REMOVE_CONTACT_REQUEST };
}

function removeSuccess(id) {
  return { type: REMOVE_CONTACT_SUCCESS, payload: { id } };
}

function removeFail(errors) {
  return { type: REMOVE_CONTACT_FAIL, payload: { errors } };
}

export function remove({ id }) {
  return dispatch => {
    dispatch(removeRequest());

    request('delete', `http://localhost:8080/api/me/contact/${id}`)
    .then(() => dispatch(removeSuccess(id)))
    .catch(errors => dispatch(removeFail(errors)));
  };
}
