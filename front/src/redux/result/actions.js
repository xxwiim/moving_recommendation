import { GET_RESULT } from './types';
// import { GET_RESULT2 } from './types';
// import { GET_RESULT3 } from './types';

export const getResult = (result) => {
  return {
    type: GET_RESULT,
    payload: result,
  };
};

// export const getResult2 = (result2) => {
//   return {
//     type: GET_RESULT2,
//     payload: result2,
//   };
// };

// export const getResult3 = (result3) => {
//   return {
//     type: GET_RESULT3,
//     payload: result3,
//   };
// };
