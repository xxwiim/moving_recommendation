import {
  EDU_CHECKED,
  HOS_CHECKED,
  FAC_CHECKED,
  WEL_CHECKED,
  SHOP_CHECKED,
  HEAL_CHECKED,
} from './types';

const initializeState = {};
const checkedReducer = (state = initializeState, action) => {
  //acion안에는 type.payload존재
  switch (action.type) {
    case EDU_CHECKED:
      return {
        ...state, //state 값 복사
        edu: action.payload, //state, //state.count -1
      };
    case HOS_CHECKED:
      return {
        ...state,
        hos: action.payload,
      };
    case WEL_CHECKED:
      return {
        ...state,
        wel: action.payload,
      };
    case FAC_CHECKED:
      return {
        ...state,
        fac: action.payload,
      };
    case SHOP_CHECKED:
      return {
        ...state,
        shop: action.payload,
      };
    case HEAL_CHECKED:
      return {
        ...state,
        heal: action.payload,
      };

    default:
      return state;
  }
};

export default checkedReducer;
