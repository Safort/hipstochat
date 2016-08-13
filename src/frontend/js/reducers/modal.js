import * as actions from '../constants/modal';


const initialState = {
  modalName: '',
  state: 'hidden',
};


export default function modal(state = initialState, action) {
  switch (action.type) {

    case actions.MODAL_SHOW:
      return {
        ...state,
        modalName: action.payload.modalName,
        state: 'showed',
      };

    case actions.MODAL_HIDE:
      return {
        ...state,
        modalName: '',
        state: 'hidden',
      };

    default:
      return state;
  }
}
