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

    INCREASE_TIME: (state, action) => {
        var time = state.time;
        time.setSeconds(time.getSeconds() + 1);
        return {
            ...state,
            time: time,
        };
    },

    default: (state, action) => {
        return {
            ...state
        }
    },

}, initialState);
