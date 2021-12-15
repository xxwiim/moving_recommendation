import { GET_TIME } from './types';

export const getTime = (location) => {
  return {
    type: GET_TIME,
    payload: location, //reducer로 값을 함께 보내줌
  };
};
