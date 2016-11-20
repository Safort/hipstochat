export const MODAL_SHOW = 'MODAL_SHOW';
export const MODAL_HIDE = 'MODAL_HIDE';


export function show(modalName, modalData) {
  return dispatch => {
    dispatch({
      type: MODAL_SHOW,
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
      type: MODAL_HIDE,
      payload: {
        state: 'hidden',
        modalName: '',
        modalData: {},
      },
    });
  };
}
