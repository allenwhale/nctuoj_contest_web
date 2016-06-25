import {
    handleActions
} from 'redux-actions';

const initialState = {
    problemList: [],
    problem: {},
    submitFormShow: false,
};


export default handleActions({

    GET_PROBLEM_LIST: {
        next(state, action) {
            return {
                ...state,
                problemList: action.payload['msg'],
            };
        },
        throw(state, action) {
            return {
                ...state,
                problemList: [],
            };
        }
    },

    GET_PROBLEM: {
        next(state, action) {
            return {
                ...state,            
                problem: action.payload['msg'],
            }
        },
        throw(state, action) {
            return {
                ...state,
                problem: {},
            };
        }
    },

    OPEN_SUBMIT_FORM: (state, action) => {
        return {
            ...state,
            submitFormShow: true,
        };
    },

    CLOSE_SUBMIT_FORM: (state, action) => {
        return {
            ...state,
            submitFormShow: false,
        };
    },

    default: (state, action) => {
        return {
            ...state
        }
    },

}, initialState);
