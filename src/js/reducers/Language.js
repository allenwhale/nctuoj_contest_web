import {
    handleActions
} from 'redux-actions';
import Config from './Config';
import swal from 'sweetalert';

const initialState = {
    languageList: {},
    languageListStatus: false,
};

export default handleActions({

    GET_LANGUAGE_LIST: {
        next(state, action) {
            return {
                ...state,
                languageList: Config.mapArrayToObject(action.payload.msg),
                languageListStatus: true,
            };
        },
        throw(state, action) {
            swal('Get Language List Error', action.payload.msg, 'error');
            return {
                ...state,
                languageList: {},
                languageListStatus: false,
            };
        },
    },

}, initialState);
