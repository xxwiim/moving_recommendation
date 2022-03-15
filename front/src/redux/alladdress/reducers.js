import { GET_ALLADDRESS } from './types';

const initializeState = {};
const alladdressReducer = (state = initializeState, action) => {
  //acion안에는 type.payload존재
  switch (action.type) {
    case GET_ALLADDRESS:
      return {
        ...state, //state 값 복사
        alladdress: action.payload, //state, //state.count -1
      };

    default:
      return state;
  }
};

export default alladdressReducer;
