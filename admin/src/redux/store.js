import { applyMiddleware, createStore } from 'redux';

import thunk from 'redux-thunk';
import reducers from './reducers';

const middlewares = [thunk];

const store = createStore(reducers, applyMiddleware(...middlewares));
window.store = store;
export default store;
