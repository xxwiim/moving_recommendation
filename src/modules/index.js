import {combineReducers} from 'redux';
import budget from './budget';

const rootReducer = combineReducers({
    budget,
});

export default rootReducer;