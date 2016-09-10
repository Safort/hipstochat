import * as actions from '../constants/dialogs';


// dummy
const initialState = {
  list: [],
};


export default function dialogs(state = initialState, action) {
  switch (action.type) {
    case actions.UPDATE_DIALOG_LIST:
      return {
        ...state,
        list: action.payload
      };


    default:
      return state;
  }
}
