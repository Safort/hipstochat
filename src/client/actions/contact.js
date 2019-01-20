import request from '../utils/request';

export const ADD_CONTACT_REQUEST = 'ADD_CONTACT_REQUEST';
export const ADD_CONTACT_SUCCESS = 'ADD_CONTACT_SUCCESS';
export const ADD_CONTACT_FAIL = 'ADD_CONTACT_FAIL';

export const GET_CONTACTS_REQUEST = 'GET_CONTACTS_REQUEST';
export const GET_CONTACTS_SUCCESS = 'GET_CONTACTS_SUCCESS';
export const GET_CONTACTS_FAIL = 'GET_CONTACTS_FAIL';

export const REMOVE_CONTACT_REQUEST = 'REMOVE_CONTACT_REQUEST';
export const REMOVE_CONTACT_SUCCESS = 'REMOVE_CONTACT_SUCCESS';
export const REMOVE_CONTACT_FAIL = 'REMOVE_CONTACT_FAIL';

/* Create contact */

function addRequest() {
  return { type: ADD_CONTACT_REQUEST };
}

function addSuccess(payload) {
  return { type: ADD_CONTACT_SUCCESS, payload };
}

function addFail(errors) {
  return { type: ADD_CONTACT_FAIL, payload: errors };
}

export function add(contactUserId, name) {
  return dispatch => {
    dispatch(addRequest());

    const body = { contactUserId };

    request('post', `http://localhost:8080/api/contacts/${contactUserId}`)
      .then(res => {
        if (res.success === true) {
          dispatch(addSuccess({ ...body, name }));
        } else {
          dispatch(addFail(res.errors));
        }
      })
      .catch(errors => addFail(errors));
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

    request('delete', `http://localhost:8080/api/contacts/${id}`)
      .then(res =>
        dispatch(res.success === true ? removeSuccess(id) : dispatch(removeFail(errors))),
      )
      .catch(errors => dispatch(removeFail(errors)));
  };
}

/* Get contacts */

const getContactsRequest = () => ({ type: GET_CONTACTS_REQUEST });

const getContactsSuccess = contacts => ({ type: GET_CONTACTS_SUCCESS, payload: { contacts } });

const getContactsFail = errors => ({ type: GET_CONTACTS_FAIL, payload: { errors } });

export function getContacts() {
  return dispatch => {
    dispatch(getContactsRequest());

    request('get', `http://localhost:8080/api/contacts`)
      .then(res => dispatch(getContactsSuccess(res.contacts)))
      .catch(errors => dispatch(getContactsFail(errors)));
  };
}
