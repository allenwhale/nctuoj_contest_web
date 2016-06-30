import { createAction } from 'redux-actions';
import Clarification from './../utils/Clarification';

export const getClarificationList = createAction('GET_CLARIFICATION_LIST', Clarification.getClarificationList);
export const postClarification = createAction('POST_CLARIFICATION', Clarification.postClarification);
export const openNewClarificationForm = createAction('OPEN_NEW_CLARIFICATION_FORM');
export const closeNewClarificationForm = createAction('CLOSE_NEW_CLARIFICATION_FORM');

