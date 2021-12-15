import { LOAD_CHECKED } from './types';

const initializeState = { load: true };
const loadReducer = (state = initializeState, action) => {
  //acion안에는 type.payload존재
  switch (action.type) {
    case LOAD_CHECKED:
      return {
        ...state, //state 값 복사
        load: action.payload, //state, //state.count -1
      };

    default:
      return state;
  }
};

export default loadReducer;
