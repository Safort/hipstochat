import * as actions from '../constants/search';

export function searchByUsername(username) {
  return (dispatch) => {
    dispatch({
      type: actions.SEARCH_LIST_REQUEST,
      payload: null,
    });

  };
}
