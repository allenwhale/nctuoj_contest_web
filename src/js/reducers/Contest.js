import {
    handleActions
} from 'redux-actions';
import Config from './Config';
import swal from 'sweetalert';

const initialState = {
    contest: {
        'title': "Online Judge System"
    },
    contestStatus: false,
};

export default handleActions({

    GET_CONTEST: {
        next(state, action) {
            return {
                ...state,
                contest: action.payload.msg,
                contestStatus: true,
            };
        },
        throw(state, action) {
            swal('Get Contest Error', action.payload.msg, 'error');
            return {
                ...state,
                contest: {},
                contestStatus: false,
            };
        }
    },

    PUT_CONTEST: {
        next(state, action) {
            swal('Update Contest', 'Update Contest Sucessfully', 'success');
            return {
                ...state,
                contest: action.payload.msg,
            };
        },
        throw(state, action) {
            swal('Update Contest Error', action.payload.msg, 'error');
            return {
                ...state,
            };
        },
    },

}, initialState);
