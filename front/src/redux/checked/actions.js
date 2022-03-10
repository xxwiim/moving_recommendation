import checkedReducer from './reducers';
import {
  EDU_CHECKED,
  CHILDREN_CHECKED,
  HOS_CHECKED,
  FAC_CHECKED,
  WEL_CHECKED,
  SHOP_CHECKED,
  HEAL_CHECKED,
  NATURE_CHECKED,
  SECURE_CHECKED,
} from './types';

export const eduChecked = (checkedInputs) => {
  return {
    type: EDU_CHECKED,
    payload: checkedInputs, //reducer로 값을 함께 보내줌
  };
};
export const childrenChecked = (checkedInputs) => {
  return {
    type: CHILDREN_CHECKED,
    payload: checkedInputs,
  };
};
export const hosChecked = (checkedInputs) => {
  return {
    type: HOS_CHECKED,
    payload: checkedInputs,
  };
};
export const facChecked = (checkedInputs) => {
  return {
    type: FAC_CHECKED,
    payload: checkedInputs,
  };
};
export const welChecked = (checkedInputs) => {
  return {
    type: WEL_CHECKED,
    payload: checkedInputs,
  };
};
export const shopChecked = (checkedInputs) => {
  return {
    type: SHOP_CHECKED,
    payload: checkedInputs,
  };
};
export const healChecked = (checkedInputs) => {
  return {
    type: HEAL_CHECKED,
    payload: checkedInputs,
  };
};
export const natureChecked = (checkedInputs) => {
  return {
    type: NATURE_CHECKED,
    payload: checkedInputs,
  };
};
export const secureChecked = (checkedInputs) => {
  return {
    type: SECURE_CHECKED,
    payload: checkedInputs,
  };
};
