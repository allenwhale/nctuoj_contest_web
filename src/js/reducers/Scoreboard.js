import {
    handleActions
} from 'redux-actions';
import Config from './Config';
import swal from 'sweetalert';

const emptyScoreboard = {
    data: {
        users: [],
        problems: [],
    },
};

const initialState = {
    scoreboard: emptyScoreboard,
    scoreboardDetailShow: false,
    scoreboardDetail: {},
};


export default handleActions({

    UPDATE_SCOREBOARD_DETAIL: (state, action) => {
        return {
            ...state,
            scoreboardDetail: action.payload,
        };
    },

    OPEN_SCOREBOARD_DETAIL: (state, action) => {
        return {
            ...state,
            scoreboardDetailShow: true,
        };
    },

    CLOSE_SCOREBOARD_DETAIL: (state, action) => {
        return {
            ...state,
            scoreboardDetailShow: false,
        };
    },

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

