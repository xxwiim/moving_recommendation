import { combineReducers } from 'redux';
import checkedReducer from './checked/reducers';
import loadReducer from './load/reducers';
import locationReducer from './location/reducers';
import priceReducer from './price/reducers';
import resultReducer from './result/reducers';
import timeReducer from './time/reducers';
import transitReducer from './transit/reducers';
import alladdressReducer from './alladdress/reducers';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['check', 'location', 'price', 'transit', 'time', 'result'],
};
const rootReducer = combineReducers({
  checked: checkedReducer,
  location: locationReducer,
  price: priceReducer,
  transit: transitReducer,
  time: timeReducer,
  result: resultReducer,
  load: loadReducer,
  alladdress: alladdressReducer,
});

export default persistReducer(persistConfig, rootReducer);
