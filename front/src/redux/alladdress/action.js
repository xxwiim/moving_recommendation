import alladdressReducer from './reducers';
import { GET_ALLADDRESS } from './types';

export const getalladdress = (alladdress) => {
  return {
    type: GET_ALLADDRESS,
    payload: alladdress, //reducer로 값을 함께 보내줌
  };
};
