import { createAction } from 'redux-actions';
import User from '../utils/User';


export const getUserList = createAction('GET_USER_LIST', User.getUserList);
export const signIn = createAction('SIGN_IN', User.signIn);
export const signOut = createAction('SIGN_OUT');
export const checkAccount = createAction('CHECK_ACCOUNT');
export const openLoginForm = createAction('OPEN_LOGIN_FORM');
export const closeLoginForm = createAction('CLOSE_LOGIN_FORM');
