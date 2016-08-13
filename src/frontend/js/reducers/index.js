import { combineReducers } from 'redux';
import user from './user';
import contacts from './contacts';
import search from './search';
import modal from './modal';

export default combineReducers({
  user,
  contacts,
  search,
  modal,
});
