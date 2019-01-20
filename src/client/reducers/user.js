import * as actions from '../actions/user';

const initialState = {
  login: null,
  name: null,
  avatarUrl: null,
  expiresIn: localStorage.getItem('expiresIn'),
  errors: [],
  isFetching: false,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case actions.SIGNUP_USER_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case actions.SIGNUP_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        login: action.payload.login,
        name: action.payload.name,
        expiresIn: action.payload.expiresIn,
        avatarUrl: action.payload.avatarUrl,
      };

    case actions.SIGNUP_USER_FAIL:
      return {
        ...state,
        isFetching: true,
      };

    //

    case actions.SIGNIN_USER_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case actions.SIGNIN_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        login: action.payload.login,
        name: action.payload.name,
        avatarUrl: action.payload.avatarUrl,
        errors: [],
        expiresIn: action.payload.expiresIn,
      };

    case actions.SIGNIN_USER_FAIL:
      return {
        ...state,
        isFetching: true,
      };

    //

    case actions.SIGNOUT_USER_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case actions.SIGNOUT_USER_SUCCESS:
      return {
        login: null,
        name: null,
        avatarUrl: null,
        errors: [],
        expiresIn: null,
        isFetching: false,
      };

    case actions.SIGNOUT_USER_FAIL:
      return {
        ...state,
        isFetching: false,
      };

    //

    case actions.LOAD_USER_INFO_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case actions.LOAD_USER_INFO_SUCCESS:
      return {
        ...state,
        login: action.payload.login,
        name: action.payload.name,
        avatarUrl: action.payload.avatarUrl,
        errors: [],
        isFetching: false,
      };

    case actions.LOAD_USER_INFO_FAIL:
      return {
        ...state,
        isFetching: false,
      };

    //

    case actions.UPDATE_USER_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case actions.UPDATE_USER_SUCCESS:
      return {
        ...state,
        login: action.payload.login,
        name: action.payload.name,
        errors: [],
        isFetching: false,
      };

    case actions.UPDATE_USER_FAIL:
      return {
        ...state,
        errors: action.payload.errors,
        isFetching: false,
      };

    default:
      return state;
  }
}
