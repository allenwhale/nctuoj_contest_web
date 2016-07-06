import {
    handleActions
} from 'redux-actions';
import swal from 'sweetalert';
import Config from './Config';
const initialState = {
    testdataList: {},
    testdata: {},
    activeSubmit: true,
};


export default handleActions({

    GET_TESTDATA_LIST: {
        next(state, action) {
            return {
                ...state,
                testdataList: Config.mapArrayToObject(action.payload.msg),
            };
        },
        throw(state, action) {
            swal('Get Testdata List Error', action.payload.msg, 'error');
            return {
                ...state,
                testdataList: {},
            };
        }
    },

    POST_TESTDATA: {
        next(state, action) {
            var testdataList = state.testdataList;
            testdataList[action.payload.msg.id] = action.payload.msg;
            return {
                ...state,
                testdataList,
            };
        },
        throw(state, action) {
            swal('New Testdata Error', action.payload.msg, 'error');
            return {
                ...state,
            };
        }
    },

    PUT_TESTDATA: {
        next(state, action) {
            var testdataList = state.testdataList;
            testdataList[action.payload.msg.id] = action.payload.msg;
            swal('Update Testdata', 'Update Testdata Successfully', 'success');
            return {
                ...state,
                testdataList,
            };
        },
        throw(state, action) {
            swal('Update Testdata Error', action.payload.msg, 'error');
            return {
                ...state,
            };
        }
    },

    DELETE_TESTDATA: {
        next(state, action) {
            var testdataList = state.testdataList;
            delete testdataList[action.payload.msg.id];
            return {
                ...state,
                testdataList,
            };
        },
        throw(state, action) {
            swal('Delete Testdata Error', action.payload.msg, 'error');
            return {
                ...state
            };
        }
    },
    
    ACTIVE_SUBMIT: (state, action) => {
        return {
            ...state,
            activeSubmit: true,
        };
    },

    DISABLE_SUBMIT: (state, action) => {
        return {
            ...state,
            activeSubmit: false,
        };
    },

}, initialState);
