import {
    handleActions
} from 'redux-actions';

const emptyAccount = {
};

const initialState = {
    account: emptyAccount,
    loginFormShow: false,
    loginErr: "",
};


export default handleActions({

    SIGN_IN: {
        next(state, action) {
            localStorage.setItem("account", JSON.stringify(action.payload['msg']));
            return {
                ...state,
                account: action.payload['msg'],
                loginFormShow: false,
            };
        },
        throw(state, action) {
            return {
                ...state,
                loginErr: JSON.parse(action.payload.error)['msg']
            };
        }
    },

    SIGN_OUT(state, action) {
        localStorage.clear();
        return {
            ...state,
            account: emptyAccount,
        }
    },

    CHECK_ACCOUNT(state, action) {
        var account = localStorage.getItem("account");
        if(account){
            try{
                account = JSON.parse(account);
            } catch(e) {
                account = emptyAccount;
            }
        } else {
            account = emptyAccount;
        }
        return {
            ...state,
            account: account,
        };
    },

    OPEN_LOGIN_FORM: (state, action) => ({
        ...state,
        loginFormShow: true,
        loginErr: "",
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
