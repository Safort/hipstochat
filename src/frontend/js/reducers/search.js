import * as actions from '../constants/search';

const initialState = {
  userList: [],
  chatList: [],
  errors: [],
  isInfoLoaded: false,
};

export default function search(state = initialState, action) {
  switch (action.type) {

    case actions.SEARCH_USER_REQUEST:
      return { ...state };

    case actions.SEARCH_USER_SUCCESS:
      return {
        ...state,
        userList: action.payload.userList,
        isInfoLoaded: true,
      };

    case actions.SEARCH_USER_FAIL:
      return {
        ...state,
        isInfoLoaded: true,
        errors: action.payload.errors,
      };

    default:
      return state;
  }
}
