import {
    handleActions
} from 'redux-actions';
import Config from './Config';
import swal from 'sweetalert';

const emptySubmission = {
    testdata: [],
};

const initialState = {
    submissionList: [],
    submissionCount: 0,
    submitFormShow: false,
    quickSubmit: false,
    submission: emptySubmission,
    submissionStatus: false,
    submitStatus: false,
};


export default handleActions({

    GET_SUBMISSION: {
        next(state, action) {
            return {
                ...state,
                submission: action.payload.msg,
                submissionStatus: true,
            };
        },
        throw(state, action) {
            swal('Get Submission Error', action.payload.msg, 'error');
            return {
                ...state,
                submission: emptySubmission,
                submissionStatus: false,
            };
        },
    },

    GET_SUBMISSION_LIST: {
        next(state, action) {
            return {
                ...state,
                submissionList: Config.mapArrayToObject(action.payload.msg.data),
                submissionCount: parseInt(action.payload.msg.count),
            }
        },
        throw(state, action) {
            swal('Get Submission List Error', action.payload.msg, "error");
            return {
                ...state,
                submissionList: {},
            };
        }
    },

    POST_SUBMISSION: {
        next(state, action) {
            return {
                ...state,
                submission: action.payload.msg,
                submitStatus: true,
                submitFormShow: false,
            };
        },
        throw(state, action) {
            swal('Submit Error', action.payload.msg, 'error');
            return {
                ...state,
                submitStatus: false,
            };
        }
    },

    OPEN_SUBMIT_FORM: (state, action) => {
        return {
            ...state,
            submitFormShow: true,
            quickSubmit: Boolean(action.payload),
        };
    },

    CLOSE_SUBMIT_FORM: (state, action) => {
        return {
            ...state,
            submitFormShow: false,
        };
    },

}, initialState);
