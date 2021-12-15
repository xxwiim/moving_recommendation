import { combineReducers } from 'redux';
import checkedReducer from './checked/reducers';
import loadReducer from './load/reducers';
import locationReducer from './location/reducers';
import priceReducer from './price/reducers';
import resultReducer from './result/reducers';
import timeReducer from './time/reducers';
import transitReducer from './transit/reducers';

const rootReducer = combineReducers({
  checked: checkedReducer,
  location: locationReducer,
  price: priceReducer,
  transit: transitReducer,
  time: timeReducer,
  result: resultReducer,
  load: loadReducer,
});

export default rootReducer;
