import { GET_PRICE } from './types';

export const getPrice = (location) => {
  return {
    type: GET_PRICE,
    payload: location, //reducer로 값을 함께 보내줌
  };
};
