import {
    handleActions
} from 'redux-actions';
import swal from 'sweetalert';

const initialState = {
    executeList: [],
    newExecuteShow: false,
};


export default handleActions({

    OPEN_NEW_EXECUTE: (state, action) => {
        return {
            ...state,
            newExecuteShow: true,
        };
    },

    CLOSE_NEW_EXECUTE: (state, action) => {
        return {
            ...state,
            newExecuteShow: false,
        };
    },

    GET_EXECUTE_LIST: {
        next(state, action) {
            return {
                ...state,
                executeList: action.payload.msg,
            };
        },
        throw(state, action) {
            swal('Get Execute List Error', action.payload.msg, "error");
            return {
                ...state,
                executeList: [],
            };
        }
    },

    DELETE_EXECUTE: {
        next(state, action) {
            const removeExecute = (executeList, execute) => {
                var res = [];
                for(var i in executeList) {
                    if(executeList[i].id != execute.id) {
                        res.push(executeList[i]);
                    }
                }
                return res;
            };
            swal('Delete Execute', 'Execute Deleted Successfully', 'success');
            return {
                ...state,
                executeList: removeExecute(state.executeList, action.payload.msg),
                executeConfirmShow: false,
            };
        },
        throw(state, action) {
            swal('Delete Execute Error', action.payload.msg, 'error');
            return {
                ...state,
                executeConfirmShow: false,
            };
        }
    },

    default: (state, action) => {
        return {
            ...state
        }
    },

}, initialState);
