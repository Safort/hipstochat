import { combineReducers } from 'redux';
import user from './user';
import search from './search';
import modal from './modal';
import contacts from './contact';
import messages from './message';


export default combineReducers({
  user,
  contacts,
  search,
  modal,
  messages,
});
