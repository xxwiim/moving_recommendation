import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import { GET_RESULT } from './result/types';
const middleware = [logger];
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);
//오류 나면 store export해보기
export const persistor = persistStore(store);
/*const resultDispatch = store.dispatch({ type: GET_RESULT });*/
export default { store, persistor };
