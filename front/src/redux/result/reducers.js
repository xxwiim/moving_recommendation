import { GET_RESULT } from './types';
// import { GET_RESULT2 } from './types';
// import { GET_RESULT3 } from './types';

const initializeState = {
  res: [
    ['경기도 남양주시 다산동', 351432793.4, ['로딩중'], 5, [0, 0], 43.2, 'bus'],
    [
      '경기도 성남시 분당구 야탑동',
      328138005,
      ['로딩중'],
      38.583333333333336,
      'bus',
    ],
    ['서울특별시 강남구 역삼동', 1000000000, ['로딩중'], 0, 'bus'],
  ],
};
const resultReducer = (state = initializeState, action) => {
  //acion안에는 type.payload존재
  switch (action.type) {
    case GET_RESULT:
      return {
        ...state, //state 값 복사
        res: action.payload, //state, //state.count -1
      };
    // case GET_RESULT2:
    //   return {
    //     ...state, //state 값 복사
    //     result2: action.payload, //state, //state.count -1
    //   };
    // case GET_RESULT3:
    //   return {
    //     ...state, //state 값 복사
    //     result3: action.payload, //state, //state.count -1
    //   };

    default:
      return state;
  }
};

export default resultReducer;
