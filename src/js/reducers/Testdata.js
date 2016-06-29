import {
    handleActions
} from 'redux-actions';
import swal from 'sweetalert';

const initialState = {
    testdataList: [],
    testdata: {},
    activeSubmit: true,
};


export default handleActions({

    GET_TESTDATA_LIST: {
        next(state, action) {
            return {
                ...state,
                testdataList: action.payload.msg,
            };
        },
        throw(state, action) {
            swal('Get Testdata List Error', action.payload.msg, 'error');
            return {
                ...state,
                testdataList: [],
            };
        }
    },

    POST_TESTDATA: {
        next(state, action) {
            return {
                ...state,
                testdataList: state.testdataList.concat([action.payload.msg]),
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
            const replaceTestdata = (testdataList, testdata) => {
                var res = [];
                for(var i in testdataList) {
                    if(testdataList[i].id == testdata.id) {
                        res.push(testdata);
                    } else {
                        res.push(testdataList[i]);
                    }
                }
                return res;
            };
            swal('Update Testdata', 'Update Testdata Successfully', 'success');
            return {
                ...state,
                testdataList: replaceTestdata(state.testdataList, action.payload.msg),
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
            console.log('r', action.payload.msg);
            const removeTestdata = (testdataList, testdata) => {
                var res = [];
                for(var i in testdataList) {
                    if(testdataList[i].id != testdata.id) {
                        res.push(testdataList[i]);
                    }
                }
                return res;
            };
            return {
                ...state,
                testdataList: removeTestdata(state.testdataList, action.payload.msg),
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

    default: (state, action) => {
        return {
            ...state
        }
    },

}, initialState);
