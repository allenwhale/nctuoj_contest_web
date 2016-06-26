import {
    handleActions
} from 'redux-actions';

const initialState = {

};


export default handleActions({

    default: (state, action) => {
        return {
            ...state
        }
    },

}, initialState);
