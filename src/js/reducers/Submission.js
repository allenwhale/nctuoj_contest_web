import {
    handleActions
} from 'redux-actions';

const initialState = {
    submissionList: [],
};


export default handleActions({

    GET_SUBMISSIONS: (state, action) => {
        return {
            submissionList: action.payload['msg'],
        };
    },

    default: (state, action) => {
        return {
            ...state
        }
    },

}, initialState);
