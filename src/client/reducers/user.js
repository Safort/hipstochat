import * as actions from '../actions/user';


const initialState = {
  username: null,
  name: null,
  email: null,
  avatarUrl: null,
  token: null,
  errors: [],
  isInfoLoaded: false, // TODO: replace on isFetching
};


export default function user(state = initialState, action) {
  switch (action.type) {
    case actions.CREATE_USER_REQUEST:
      return { ...state };

    case actions.CREATE_USER_SUCCESS:
      return {
        ...state,
        username: action.payload.username,
        name: action.payload.name,
        email: action.payload.email,
        avatarUrl: action.payload.avatarUrl,
      };

    case actions.CREATE_USER_FAIL:
      return { ...state };

    //

    case actions.SIGNIN_USER_REQUEST:
      return { ...state };

    case actions.SIGNIN_USER_SUCCESS:
      return {
        ...state,
        username: action.payload.username,
        name: action.payload.name,
        email: action.payload.email,
        avatarUrl: action.payload.avatarUrl,
        errors: [],
        token: action.payload.token,
      };

    case actions.SIGNIN_USER_FAIL:
      return { ...state };

    //

    case actions.SIGNOUT_USER_REQUEST:
      return { ...state };

    case actions.SIGNOUT_USER_SUCCESS:
      return {
        username: null,
        name: null,
        email: null,
        avatarUrl: null,
        errors: [],
        token: null,
        isInfoLoaded: true,
      };

    case actions.SIGNOUT_USER_FAIL:
      return { ...state };

    //

    case actions.LOAD_USER_INFO_REQUEST:
      return {
        ...state,
        isInfoLoaded: false,
      };

    case actions.LOAD_USER_INFO_SUCCESS:
      return {
        ...state,
        username: action.payload.username,
        name: action.payload.name,
        email: action.payload.email,
        avatarUrl: action.payload.avatarUrl,
        errors: [],
        token: action.payload.token,
        isInfoLoaded: true,
      };

    case actions.LOAD_USER_INFO_FAIL:
      return {
        ...state,
        isInfoLoaded: true,
      };

    //

    case actions.UPDATE_USER_REQUEST:
      return {
        ...state,
        isInfoLoaded: false,
      };

    case actions.UPDATE_USER_SUCCESS:
      return {
        ...state,
        username: action.payload.username,
        name: action.payload.name,
        email: action.payload.email,
        errors: [],
        token: action.payload.token,
        isInfoLoaded: true,
      };

    case actions.UPDATE_USER_FAIL:
      return {
        ...state,
        errors: action.payload.errors,
        isInfoLoaded: true,
      };

    default:
      return state;
  }
}