import * as actions from '../actions/modal';


const initialState = {
  modalName: '',
  modalData: {},
  state: 'hidden',
};


export default function modal(state = initialState, action) {
  switch (action.type) {
    case actions.MODAL_SHOW:
      return {
        ...state,
        modalName: action.payload.modalName,
        modalData: action.payload.modalData,
        state: 'showed',
      };

    case actions.MODAL_HIDE:
      return {
        ...state,
        modalName: '',
        modalData: {},
        state: 'hidden',
      };

    default:
      return state;
  }
}
