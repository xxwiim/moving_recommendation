import { GET_TRANSIT } from './types';

const initializeState = {};
const transitReducer = (state = initializeState, action) => {
  //acion안에는 type.payload존재
  switch (action.type) {
    case GET_TRANSIT:
      return {
        ...state, //state 값 복사
        transit: action.payload, //state, //state.count -1
      };

    default:
      return state;
  }
};

export default transitReducer;
