import * as actions from '../constants/search';

const initialState = {
  userList: [
    { username: 'Username' },
    { username: 'Username2' },
    { username: 'Username3' },
    { username: 'Username4' },
  ],
  chatList: [
    { chatname: 'chatname' },
    { chatname: 'chatname2' },
    { chatname: 'chatname3' },
    { chatname: 'chatname4' },
  ],
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
