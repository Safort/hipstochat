import * as actions from '../actions/message';

const initialState = {
  errors: [],
  user: {},
  list: [],
};


export default function message(state = initialState, action) {
  switch (action.type) {
    case actions.GET_MESSAGES_REQUEST:
      return { ...state };


    case actions.GET_MESSAGES_SUCCESS: {
      return { ...state, list: action.payload.list };
    }

    case actions.GET_MESSAGES_FAIL:
      return { ...state };

    case actions.SEND_MESSAGE_REQUEST:
      return { ...state };


    case actions.SEND_MESSAGE_SUCCESS: {
      const list = [...state.list].concat(action.payload.message);

      return { ...state, list };
    }

    case actions.SEND_MESSAGE_FAIL:
      return { ...state, errors: action.payload.errors };


    default:
      return state;
  }
}
