import { GET_TIME } from './types';

const initializeState = {};
const timeReducer = (state = initializeState, action) => {
  //acion안에는 type.payload존재
  switch (action.type) {
    case GET_TIME:
      return {
        ...state, //state 값 복사
        time: action.payload, //state, //state.count -1
      };

    default:
      return state;
  }
};

export default timeReducer;
