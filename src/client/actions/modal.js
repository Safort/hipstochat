export const MODAL_SHOW = 'MODAL_SHOW';
export const MODAL_HIDE = 'MODAL_HIDE';

function showModal({ modalName, modalData }) {
  return {
    type: MODAL_SHOW,
    payload: {
      state: 'showed',
      modalName,
      modalData,
    },
  };
}

function hideModal() {
  return {
    type: MODAL_HIDE,
    payload: {
      state: 'hidden',
      modalName: '',
      modalData: {},
    },
  };
}

export function show(modalName, modalData) {
  return dispatch => dispatch(showModal({ modalName, modalData }));
}

export function hide() {
  return dispatch => dispatch(hideModal());
}
