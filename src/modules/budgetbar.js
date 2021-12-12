import { createAction, handleActions } from "redux-actions";

/* 액션 타입 정의 */
const SET_VALUE = 'budgetbar/SET_VALUE';

export const setValue = createAction(SET_VALUE, value => value)

const initialState = {
    value: ''
};


const budgetbar = (state=initialState, action) => {
        switch(action.type) {
            case SET_VALUE:
                return {
                    ...state,
                    value: action.data
                };
            default:
                return state;
        }
};

export default budgetbar;


