import {
    handleActions
} from 'redux-actions';
import Config from './Config';
import swal from 'sweetalert';

const initialState = {
    verdictList: {},
    verdictListStatus: false,
};

export default handleActions({

    GET_VERDICT_LIST: {
        next(state, action) {
            return {
                ...state,
                verdictList: Config.mapArrayToObject(action.payload.msg),
                verdictListStatus: true,
            };
        },
        throw(state, action) {
            swal('Get Verdict List Error', action.payload.msg, 'error');
            return {
                ...state,
                verdictList: {},
                verdictListStatus: false,
            };
        },
    },

}, initialState);
