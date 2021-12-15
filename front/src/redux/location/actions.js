import locationReducer from './reducers';
import { GET_LOCATION } from './types';

export const getLocation = (location) => {
  return {
    type: GET_LOCATION,
    payload: location, //reducer로 값을 함께 보내줌
  };
};
