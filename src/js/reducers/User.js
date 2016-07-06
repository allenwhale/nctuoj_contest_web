import {
    handleActions
} from 'redux-actions';
import Config from './Config';
import swal from 'sweetalert';

const initialState = {
    account: {},
    user: {},
    checkAccountStatus: false,
    userList: {},
    newUserFormShow: false,
    loginFormShow: false,
};


export default handleActions({

    GET_USER_ME: {
        next(state, action) {
            return {
                ...state,
                account: action.payload.msg,
                checkAccountStatus: true,
            };
        },
        throw(state, action) {
            return {
                ...state,
                account: {},
                checkAccountStatus: true,
            };
        },
    },

    GET_USER: {
        next(state, action) {
            return {
                ...state,
                user: action.payload.msg,
            };
        },
        throw(state, action) {
            swal('Get User Error', action.payload.msg, 'error');
            return {
                ...state,
                user: {},
            };
        },
    },

    POST_USER: {
        next(state, action) {
            swal('Add User', 'Add User Successfully', 'success');
            var userList = state.userList;
            userList[action.payload.msg.id] = action.payload.msg;
            return {
                ...state,
                newUserFormShow: false,
                userList,
            };
        },
        throw(state, action) {
            swal('Add User Error', action.payload.msg, 'error');
            return {
                ...state,
            };
        },
    },

    POST_USER_CSV: {
        next(state, action) {
            //swal('Upload Users CSV', 'Upload Users CSV Successfully', 'success');
            swal({
                title: 'Upload Users CSV',
                text: 'Upload Users CSV Successfully',
                type: 'success',
            }, () => {
                window.location = window.location;
            })
            return {
                ...state,
            };
        },
        throw(state, action) {
            swal('Upload Users CSV Error', action.payload.msg, 'error');
            return {
                ...state,
            };
        },
    },

    DELETE_USER: {
        next(state, action) {
            if(state.account.id == action.payload.msg.id) {
                window.location = window.location;
            }
            swal('Delete User', 'Delete User Successfully', 'success');
            var userList = state.userList;
            delete userList[action.payload.msg.id];
            return {
                ...state,
                userList,
                user: action.payload.msg,
            };
        },
        throw(state, action) {
            swal('Delete User Error', action.payload.msg, 'error');
            return {
                ...state,
            };
        },
    },

    PUT_USER: {
        next(state, action) {
            if(state.account.id == action.payload.msg.id) {
                window.location = window.location;
            }
            swal('Update User', 'Update User Successfully', 'success');
            var userList = state.userList;
            userList[action.payload.msg.id] = action.payload.msg;
            return {
                ...state,
                userList,
                user: action.payload.msg,
            };
        },
        throw(state, action) {
            swal('Update User Error', action.payload.msg, 'error');
            return {
                ...state,
            };
        },
    },

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
            localStorage.setItem("account", JSON.stringify(action.payload.msg));
            window.location = window.location;
            return {
                ...state,
                account: action.payload.msg,
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

    OPEN_LOGIN_FORM: (state, action) => ({
        ...state,
        loginFormShow: true,
    }),

    CLOSE_LOGIN_FORM: (state, action) => ({
        ...state,
        loginFormShow: false,
    }),

    OPEN_NEW_USER_FORM: (state, action) => ({
        ...state,
        newUserFormShow: true,
    }),

    CLOSE_NEW_USER_FORM: (state, action) => ({
        ...state,
        newUserFormShow: false,
    }),

    default: (state, action) => {
        return {
            ...state
        }
    },

}, initialState);
