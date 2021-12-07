import { createAction, handleActions } from "redux-actions";

const INITIALIZE = 'budget/INITIALIZE'; //초기화
const CHANGE_FILED = 'budget/CHANGE_FIELD'; //특정 KEY값 바꾸기

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FILED, ({key, value}) => ({
    key,
    value
}));

const initialState = {

};

const budget = handleActions(
    {
        [INITIALIZE]: state => initialState,
    },
    initialState,
);

export default budget;