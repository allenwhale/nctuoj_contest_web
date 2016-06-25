import { createAction } from 'redux-actions';
import Problem from '../utils/Problem';

export const getProblemList = createAction('GET_PROBLEM_LIST', Problem.getProblemList);
export const getProblem = createAction('GET_PROBLEM', Problem.getProblem);
export const openSubmitForm = createAction('OPEN_SUBMIT_FORM');
export const closeSubmitForm = createAction('CLOSE_SUBMIT_FORM');
