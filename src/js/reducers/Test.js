import {
    handleActions
} from 'redux-actions';

const initialState = {
    test: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
};
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

export default handleActions({

    CHANGE_LIST: (state, action) => {
        shuffle(state.test);
        return {
            test: state.test,
        };
    },

    default: (state, action) => {
        return {
            ...state
        }
    },

}, initialState);

