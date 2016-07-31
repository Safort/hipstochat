import * as actions from '../constants/search';

const initialState = {
  userList: [
    { username: 'Username' },
    { username: 'Username2' },
    { username: 'Username3' },
    { username: 'Username4' },
  ],
  errors: [],
  isInfoLoaded: false,
};

export default function search(state = initialState, action) {
  switch (action.type) {

    default:
      return state;
  }
}
