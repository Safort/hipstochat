import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import ping from '../enhancers/ping';
import redirect from '../enhancers/redirect';


const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(thunk, ping, redirect)
);

export default store;
