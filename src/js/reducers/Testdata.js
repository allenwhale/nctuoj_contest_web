import {
    handleActions
} from 'redux-actions';
import swal from 'sweetalert';

const initialState = {
    testdataList: [],
    testdata: {},
};


export default handleActions({

    POST_TESTDATA: {
        next(state, action) {
            return {
                ...state,
                testdataList: state.testdataList.concat([actions.payload.msg]),
            };
        },
        throw(state, action) {
            swal('New Testdata Error', action.payload.msg, 'error');
            return {
                ...state,
            };
        }
    },

    ACTION: {
        next(state, action) {
            return {
                ...state,
            }
        },
        throw(state, action) {
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
