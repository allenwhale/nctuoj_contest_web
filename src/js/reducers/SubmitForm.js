import {
    handleActions
} from 'redux-actions';

const initialState = {
    executeType: '',
    theme: '',
    keyMap: '',
};


export default handleActions({

    CHANGE_EXECUTE_TYPE: (state, action) => {
        return {
            ...state,
            executeType: action.payload,
        };
    },

    CHANGE_THEME: (state, action) => {
        return {
            ...state,
            theme: actions.payload,
        };
    },

    CHANGE_KEY_MAP: (state, action) => {
        return {
            ...state,
            keyMap: action.payload,
        };
    },

    default: (state, action) => {
        return {
            ...state
        }
    },

}, initialState);
