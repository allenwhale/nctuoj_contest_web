import {
    handleActions
} from 'redux-actions';
import swal from 'sweetalert';

const initialState = {
    submissionList: [],
    submitFormShow: false,
    submission: {}
};


export default handleActions({

    GET_SUBMISSION: {

    },

    GET_SUBMISSION_LIST: {
        next(state, action) {
            return {
                ...state,
                submissionList: action.payload.msg,
            }
        },
        throw(state, action) {
            swal('Get Submission List', action.payload.msg, "error");
            return {
                ...state,
                submissionList: [],
            };
        }
    },

    POST_SUBMISSION: {
        next(state, action) {
            return {
                ...state,
                submitFormShow: false,
            };
        },
        throw(state, action) {
            swal('Submit Error', action.payload.msg, 'error');
            return {
                ...state,
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
