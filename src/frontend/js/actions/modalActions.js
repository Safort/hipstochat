import * as actions from '../constants/modal';


export function show(modalName, modalData) {
  return dispatch => {
    dispatch({
      type: actions.MODAL_SHOW,
      payload: {
        state: 'showed',
        modalName,
        modalData,
      },
    });
  };
}


export function hide() {
  return dispatch => {
    dispatch({
      type: actions.MODAL_HIDE,
      payload: {
        state: 'hidden',
        modalName: '',
        modalData: {},
      },
    });
  };
}
