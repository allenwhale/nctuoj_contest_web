import {
    handleActions
} from 'redux-actions';
import swal from 'sweetalert';
import Config from './Config';

const initialState = {
    clarificationList: {},
    filterClarificationList: {},
    clarification: {},
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

    FILTER_CLARIFICATION_LIST: (state, action) => {
        var filterClarificationList = {};
        console.log(action.payload);
        if(action.payload != '') {
            for(var i in state.clarificationList) {
                console.log(state.clarificationList[i].problem_id, action.payload);
                if(state.clarificationList[i].problem_id == action.payload) {
                    filterClarificationList[i] = state.clarificationList[i];
                }
            }
        } else {
            filterClarificationList = state.clarificationList;
        }
        return {
            ...state,
            filterClarificationList,
        };
    },

    GET_CLARIFICATION_LIST: {
        next(state, action) {
            var clarificationList = Config.mapArrayToObject(action.payload.msg);
            return {
                ...state,
                clarificationList,
                filterClarificationList: clarificationList,
            };
        },
        throw(state, action) {
            swal('Get Clarification List Error', action.payload.msg, 'error');
            return {
                ...state,
                clarificationList: {},
                filterClarificationList: {},
            };
        }
    },

    GET_CLARIFICATION: {
        next(state, action) {
            return {
                ...state,
                clarification: action.payload.msg,
            };
        },
        throw(state, action) {
            swal('Get Clarification Error', action.payload.msg, 'error');
            return {
                ...state,
            };
        },
    },

    POST_CLARIFICATION: {
        next(state, action) {
            var clarificationList = state.clarificationList;
            clarificationList[action.payload.msg.id] = action.payload.msg;
            return {
                ...state,
                clarificationList,
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

    PUT_CLARIFICATION: {
        next(state, action) {
            var clarificationList = state.clarificationList;
            clarificationList[action.payload.msg.id] = action.payload.msg;
            swal('Reply Clarification', 'Relay Clarification Successfully', 'success');
            return {
                ...state,
                clarificationList,
                clarification: action.payload.msg,
                newClarificationShow: false,
            };
        },
        throw(state, action) {
            swal('Reply Clarification Error', action.payload.msg, 'error');
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
