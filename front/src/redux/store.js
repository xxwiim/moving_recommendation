import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { GET_RESULT } from './result/types';
const middleware = [logger];
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);

/*const resultDispatch = store.dispatch({ type: GET_RESULT });*/
export default store;
