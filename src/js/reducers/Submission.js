import {
    handleActions
} from 'redux-actions';

const initialState = {
    submissionList: [],
    submission: {}
};


export default handleActions({

    GET_SUBMISSION: {

    },

    GET_SUBMISSION_LIST: {
        next(state, action) {
            return {
                ...state,
                submissionList: action.payload['msg'],
            }
        },
        throw(state, action) {
            return {
                ...state,
                submissionList: [],
            };
        }
    },

    default: (state, action) => {
        return {
            ...state
        }
    },

}, initialState);
