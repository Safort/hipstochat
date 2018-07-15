import * as actions from '../actions/contact';


const initialState = {
  list: [],
  errors: [],
};


export default function contacts(state = initialState, action) {
  switch (action.type) {
    case actions.UPDATE_CONTACT_LIST: {
      return {
        ...state,
        list: action.payload,
      };
    }


    case actions.CREATE_CONTACT_SUCCESS: {
      const list = [...state.list];
      list.push(action.payload);

      return { ...state, list };
    }


    case actions.REMOVE_CONTACT_REQUEST: {
      return { ...state };
    }


    case actions.REMOVE_CONTACT_SUCCESS: {
      const { id } = action.payload;
      const list = state.list.filter(contact => contact.id !== id);

      return { ...state, list };
    }


    case actions.REMOVE_CONTACT_FAIL: {
      return { ...state };
    }


    default: {
      return state;
    }
  }
}
