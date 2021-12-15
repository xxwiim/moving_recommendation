import { GET_TRANSIT } from './types';

export const getTransit = (location) => {
  return {
    type: GET_TRANSIT,
    payload: location, //reducer로 값을 함께 보내줌
  };
};
