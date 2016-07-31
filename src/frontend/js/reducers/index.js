import { combineReducers } from 'redux';
import user from './user';
import contacts from './contacts';
import search from './search';

export default combineReducers({ user, contacts, search });
