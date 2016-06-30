import {
    handleActions
} from 'redux-actions';
import swal from 'sweetalert';

const initialState = {
    clarificationList: [],
    newClarificationShow: false,
};


export default handleActions({

    OPEN_NEW_CLARIFICATION_FORM: (state, actions) => {
        return {
            ...state,
            newClarificationShow: true,
        };
    },

    CLOSE_NEW_CLARIFICATION_FORM: (state, actions) => {
        return {
            ...state,
            newClarificationShow: false,
        };
    },

    GET_CLARIFICATION_LIST: {
        next(state, action) {
            return {
                ...state,
                clarificationList: action.payload.msg,
            };
        },
        throw(state, action) {
            swal('Get Clarification List Error', action.payload.msg, 'error');
            return {
                ...state,
                clarificationList: [],
            };
        }
    },

    POST_CLARIFICATION: {
        next(state, action) {
            return {
                ...state,
                clarificationList: state.clarificationList.concat([action.payload.msg]),
                newClarificationShow: false,
            };
        },
        throw(state, action) {
            swal('New Clarification Error', action.payload.msg, 'error');
            return {
                ...state,
            };
        }
    },

    default: (state, action) => {
        return {
            ...state
        }
    },

}, initialState);
