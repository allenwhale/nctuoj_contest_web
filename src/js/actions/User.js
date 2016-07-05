import { createAction } from 'redux-actions';
import User from '../utils/User';

export const getUser = createAction('GET_USER', User.getUser);
export const putUser = createAction('PUT_USER', User.putUser);
export const postUser = createAction('POST_USER', User.postUser);
export const deleteUser = createAction('DELETE_USER', User.deleteUser);
export const postUserCsv = createAction('POST_USER_CSV', User.postUserCsv);
export const getUserList = createAction('GET_USER_LIST', User.getUserList);
export const signIn = createAction('SIGN_IN', User.signIn);
export const signOut = createAction('SIGN_OUT');
export const checkAccount = createAction('CHECK_ACCOUNT');
export const openLoginForm = createAction('OPEN_LOGIN_FORM');
export const closeLoginForm = createAction('CLOSE_LOGIN_FORM');
export const openNewUserForm = createAction('OPEN_NEW_USER_FORM');
export const closeNewUserForm = createAction('CLOSE_NEW_USER_FORM');
