import { GET_PRICE } from './types';

const initializeState = {};
const priceReducer = (state = initializeState, action) => {
  //acion안에는 type.payload존재
  switch (action.type) {
    case GET_PRICE:
      return {
        ...state, //state 값 복사
        price: action.payload, //state, //state.count -1
      };

    default:
      return state;
  }
};

export default priceReducer;
