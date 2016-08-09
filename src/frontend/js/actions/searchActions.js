import * as actions from '../constants/search';

export function searchUser({ username }) {
  return (dispatch) => {
    dispatch({
      type: actions.SEARCH_USER_REQUEST,
      payload: null,
    });

    /* eslint quote-props: 0 */
    fetch(
      `http://localhost:8080/api/users/${username}`,
      {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
    .then(res => res.json())
    .then(({ userList }) => {
      dispatch({
        type: actions.SEARCH_USER_SUCCESS,
        payload: {
          userList,
          errors: [],
        },
      });
    })
    .catch(() => {
      dispatch({
        type: actions.SEARCH_USER_FAIL,
        payload: {},
      });
    });
  };
}
