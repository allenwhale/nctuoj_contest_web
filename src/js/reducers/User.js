import {
    handleActions
} from 'redux-actions';
import Config from './Config';
import swal from 'sweetalert';

const initialState = {
    account: {},
    userList: {},
    loginFormShow: false,
};


export default handleActions({

    GET_USER_LIST: {
        next(state, action) {
            return {
                ...state,
                userList: Config.mapArrayToObject(action.payload.msg),
                problemListStatus: true,
                userListStatus: true,
            };
        },
        throw(state, action) {
            swal('Get User List Error', action.payload.msg, 'error');
            return {
                ...state,
                userList: {},
                userListStatus: false,
            };
        }
    },

    SIGN_IN: {
        next(state, action) {
            localStorage.setItem("account", JSON.stringify(action.payload['msg']));
            window.location = window.location;
            return {
                ...state,
                account: action.payload['msg'],
                loginFormShow: false,
            };
        },
        throw(state, action) {
            swal("Login Failed", action.payload.msg, "error");
            return {
                ...state,
            };
        }
    },

    SIGN_OUT(state, action) {
        localStorage.clear();
        window.location = window.location;
        return {
            ...state,
            account: {},
        }
    },

    CHECK_ACCOUNT(state, action) {
        var account = localStorage.getItem("account");
        if(account){
            try{
                account = JSON.parse(account);
            } catch(e) {
                account = {};
            }
        } else {
            account = {};
        }
        return {
            ...state,
            account: account,
        };
    },

    OPEN_LOGIN_FORM: (state, action) => ({
        ...state,
        loginFormShow: true,
    }),

    CLOSE_LOGIN_FORM: (state, action) => ({
        ...state,
        loginFormShow: false,
    }),

    default: (state, action) => {
        return {
            ...state
        }
    },

}, initialState);
