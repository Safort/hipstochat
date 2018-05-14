import * as actions from '../actions/search';


const initialState = {
  users: [],
  errors: [],
  isFetching: false,
};


export default function search(state = initialState, action) {
  switch (action.type) {

    case actions.SEARCH_USER_REQUEST:
      return { ...state };

    case actions.SEARCH_USER_SUCCESS:
      return {
        ...state,
        users: action.payload.users,
        isFetching: false,
      };

    case actions.SEARCH_USER_FAIL:
      return {
        ...state,
        isFetching: false,
      };

    case actions.SEARCH_CLEAR:
      return {
        users: [],
        errors: [],
        isFetching: true,
      };

    default:
      return state;
  }
}
