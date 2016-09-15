import * as actions from '../constants/dialogs';


// dummy
const initialState = {
  list: [],
  errors: [],
};


export default function dialogs(state = initialState, action) {
  switch (action.type) {
    case actions.UPDATE_DIALOG_LIST:
      return {
        ...state,
        list: action.payload,
      };


    case actions.CREATE_DIALOG_SUCCESS: {
      const list = [...state.list];
      list.push(action.payload);

      return { ...state, list };
    }


    case actions.REMOVE_DIALOG_REQUEST:
      return { ...state };


    case actions.REMOVE_DIALOG_SUCCESS: {
      const { dialogUserId } = action.payload;
      const list = state.list
        .filter(dialog => dialog.dialogUserId !== dialogUserId);

      return { ...state, list };
    }


    case actions.REMOVE_DIALOG_FAIL:
      return { ...state };


    default:
      return state;
  }
}
