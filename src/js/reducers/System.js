import {
    handleActions
} from 'redux-actions';

const initialState = {
    time: new Date(),
};


export default handleActions({

    GET_TIME: {
        next(state, action) {
            return {
                ...state,
                time: new Date(action.payload.msg),
            };
        },
        throw(state, action) {
            return {
                ...state,
            };
        }
    },

}, initialState);
