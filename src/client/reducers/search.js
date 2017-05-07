import * as actions from '../actions/search';


const initialState = {
  userList: [],
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
      };

    case actions.SEARCH_CLEAR:
      return {
        userList: [],
        errors: [],
        isInfoLoaded: false,
      };

    default:
      return state;
  }
}
