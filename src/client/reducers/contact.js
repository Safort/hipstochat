import * as actions from '../actions/contact';

const initialState = {
  list: [],
  errors: [],
  isFetching: false,
};

export default function contacts(state = initialState, action) {
  switch (action.type) {
    case actions.ADD_CONTACT_SUCCESS: {
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

    case actions.GET_CONTACTS_REQUEST: {
      return { ...state, errors: [], isFetching: true };
    }

    case actions.GET_CONTACTS_FAIL: {
      return { ...state, errors: action.payload.errors, isFetching: false };
    }

    case actions.GET_CONTACTS_SUCCESS: {
      return {
        ...state,
        errors: [],
        isFetching: false,
        list: action.payload.contacts,
      };
    }

    default: {
      return state;
    }
  }
}
