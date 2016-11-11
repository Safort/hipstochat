import { combineReducers } from 'redux';
import user from './user';
import search from './search';
import modal from './modal';
import dialogs from './dialog';


export default combineReducers({
  user,
  dialogs,
  search,
  modal,
});
