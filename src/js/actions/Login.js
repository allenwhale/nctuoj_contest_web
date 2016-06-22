import { createAction } from 'redux-actions';
import Users from '../utils/Users';

export const signIn = createAction('SIGN_IN', Users.signIn);
export const signOut = createAction('SIGN_OUT');
export const checkAccount = createAction('CHECK_ACCOUNT');
export const openLoginForm = createAction('OPEN_LOGIN_FORM');
export const closeLoginForm = createAction('CLOSE_LOGIN_FORM');
