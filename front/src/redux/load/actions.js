import { LOAD_CHECKED } from './types';

export const loadChecked = (load) => {
  return {
    type: LOAD_CHECKED,
    payload: load,
  };
};
