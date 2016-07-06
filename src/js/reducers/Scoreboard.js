import {
    handleActions
} from 'redux-actions';
import swal from 'sweetalert';

const emptyScoreboard = {
    data: {
        users: [],
        problems: [],
    },
};

const initialState = {
    scoreboard: emptyScoreboard,
};


export default handleActions({

    GET_SCOREBOARD: {
        next(state, action) {
            return {
                ...state,
                scoreboard: action.payload.msg,
            };
        },
        throw(state, action) {
            swal('Get Scoreboard Error', action.payload.msg, 'error');
            return {
                ...state,
                scoreboard: emptyScoreboard,
            };
        }
    },

}, initialState);

