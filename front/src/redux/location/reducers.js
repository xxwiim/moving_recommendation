import { GET_LOCATION } from './types';

const initializeState = {};
const locationReducer = (state = initializeState, action) => {
  //acion안에는 type.payload존재
  switch (action.type) {
    case GET_LOCATION:
      return {
        ...state, //state 값 복사
        location: action.payload, //state, //state.count -1
      };

    default:
      return state;
  }
};

export default locationReducer;
